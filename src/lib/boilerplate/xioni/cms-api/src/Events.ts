import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import type { XioniCMS, XioniCMSData } from '../types'
import { formatFromTo } from '$lib/utils/formatDate'

export function EventsFactory(fetchFn: typeof fetch = fetch) {
	const fetchJson = xioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get all Events by module
	 *
	 * @param module Module id
	 * @param filter.limit Maximale Anzahl an Artikeln
	 * @param filter.startsBefore Event startet vor Datum
	 * @param filter.startsAfter Event startet nach Datum
	 * @param filter.endsBefore Event endet vor Datum
	 * @param filter.endsAfter Event endet nach Datum
	 */

	async function getEvents(
		module: number,
		filter: {
			limit?: number
			startsBefore?: Date
			startsAfter?: Date
			endsBefore?: Date
			endsAfter?: Date
		} = {}
	): Promise<XioniCMSData<XioniCMS.Event[]>> {
		const context = { emitter: 'getEvents' }
		const params = {}

		event.emit('loading', context)

		if ('limit' in filter) {
			Object.assign(params, { limit: filter.limit })
		}

		if (filter.startsBefore) {
			Object.assign(params, { startsBefore: filter.startsBefore.toDateString() })
		}

		if (filter.startsAfter) {
			Object.assign(params, { startsAfter: filter.startsAfter.toDateString() })
		}

		if (filter.endsBefore) {
			Object.assign(params, { endsBefore: filter.endsBefore.toDateString() })
		}

		if (filter.endsAfter) {
			Object.assign(params, { endsAfter: filter.endsAfter.toDateString() })
		}

		const response = await fetchJson(['cms/events', module], { params })

		if (response.status === 'success') {
			const events = (response.data as []).map(eventAdapter) as XioniCMS.Event[]

			event.emit('loaded', events, context)
			event.emit('finally', context)

			return [events, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	/**
	 * Get a single XioniEvent
	 *
	 * @param id XioniEvent id
	 * @returns XioniEvent
	 */

	async function getEvent(id: number): Promise<XioniCMSData<XioniCMS.Event>> {
		const context = { emitter: 'getEvent' }

		event.emit('loading', context)

		const response = await fetchJson(['cms/event', id])

		if (response.status === 'success') {
			const data = eventAdapter(response.data) as XioniCMS.Event

			event.emit('loaded', data, context)
			event.emit('finally', context)

			return [data, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	return {
		getEvents,
		getEvent,
		$event: event
	}
}

export const getEvents = EventsFactory().getEvents

export const getEvent = EventsFactory().getEvent

// --- [ Helper ] ----------------------------------------------------------------------------------

/**
 * Set propper Date() and URL() Object where nessesary
 *
 * @param rawEvent
 * @returns Xioni XioniEvent
 */

function eventAdapter(rawEvent: any): XioniCMS.Event {
	const starts = new Date(rawEvent.starts)
	const ends = new Date(rawEvent.ends)

	const event = {
		...rawEvent,
		starts,
		ends,
		duration: formatFromTo(starts, ends)
	}

	if (rawEvent.website) {
		event.website = new URL(rawEvent.website)
	}

	if (rawEvent.ticketshop) {
		event.ticketshop = new URL(rawEvent.ticketshop)
	}

	return event
}
