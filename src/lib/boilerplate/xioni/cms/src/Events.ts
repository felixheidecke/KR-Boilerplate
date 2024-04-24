import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import type { XioniCMS, XioniCMSData } from '../types'
import { formatFromTo } from '$lib/utils/formatDate'
import type { Xioni } from '../../xioni.types'

export function useEvents(fetchFn: typeof fetch = fetch) {
	const fetchJson = xioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get all Events by module
	 *
	 * @param module Module id
	 * @param query.limit Maximale Anzahl an Artikeln
	 * @param query.startsBefore Event startet vor Datum
	 * @param query.startsAfter Event startet nach Datum
	 * @param query.endsBefore Event endet vor Datum
	 * @param query.endsAfter Event endet nach Datum
	 */

	async function getEvents(
		module: number,
		query: {
			limit?: number
			startsBefore?: Date
			startsAfter?: Date
			endsBefore?: Date
			endsAfter?: Date
			detailLevel?: Xioni.DetailLevel.MINIMAL | Xioni.DetailLevel.BASIC
		} = {}
	): Promise<XioniCMSData<XioniCMS.Event[]>> {
		const context = { emitter: 'getEvents' }
		const params = {}

		if ('limit' in query) {
			Object.assign(params, { limit: query.limit })
		}

		if (query.startsBefore) {
			Object.assign(params, { startsBefore: query.startsBefore.toDateString() })
		}

		if (query.startsAfter) {
			Object.assign(params, { startsAfter: query.startsAfter.toDateString() })
		}

		if (query.endsBefore) {
			Object.assign(params, { endsBefore: query.endsBefore.toDateString() })
		}

		if (query.endsAfter) {
			Object.assign(params, { endsAfter: query.endsAfter.toDateString() })
		}

		if (query.detailLevel) {
			Object.assign(params, { detailLevel: query.detailLevel })
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

	async function getEvent(module: number, id: number): Promise<XioniCMSData<XioniCMS.Event.Full>> {
		const context = { emitter: 'getEvent' }

		const response = await fetchJson(['cms/events', module, id])

		if (response.status === 'success') {
			const data = eventAdapter(response.data) as XioniCMS.Event.Full

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

export const getEvents = useEvents().getEvents

export const getEvent = useEvents().getEvent

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
