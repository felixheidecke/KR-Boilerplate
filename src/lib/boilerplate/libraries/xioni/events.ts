import { formatFromTo } from '$lib/boilerplate/utils/format-date'
import { FetchResponseStatus } from '../fetch-json/types'
import XioniFetch from '../xioni-fetch'
import type { XioniEvent } from './events.types'
import type { XioniResponse } from './types'

export default function XioniEvents(fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Get all Events by module
	 *
	 * @param module Module id
	 * @param filter.limit Maximale Anzahl an Artikeln
	 * @param filter.startsBefore Event startet vor Datum
	 * @param filter.startsAfter Event startet nach Datum
	 * @param filter.endsBefore Event endet vor Datum
	 * @param filter.endsAfter Event endet nach Datum
	 * @param filter.parts Event data items to load
	 */

	async function getEvents(
		module: number,
		filter: {
			limit?: number
			startsBefore?: Date
			startsAfter?: Date
			endsBefore?: Date
			endsAfter?: Date
			parts?: Array<'images' | 'flags'>
		} = {}
	): Promise<XioniResponse<XioniEvent[]>> {
		const params = {}

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

		if (filter.parts) {
			Object.assign(params, { parts: filter.parts.join() })
		}

		const { status, data } = await xioniFetch(['events', module], { params })

		if (status === FetchResponseStatus.SUCCESS) {
			return [undefined, data.map(eventAdapter)]
		} else {
			return [data, undefined]
		}
	}

	/**
	 * Get a single XioniEvent
	 *
	 * @param id XioniEvent id
	 * @returns XioniEvent
	 */

	async function getEvent(id: number): Promise<XioniResponse<XioniEvent>> {
		const { status, data } = await xioniFetch(['event', id])

		if (status === FetchResponseStatus.SUCCESS) {
			return [undefined, eventAdapter(data)]
		} else {
			return [data, undefined]
		}
	}

	return {
		getEvents,
		getEvent
	}
}

// --- [ Helper ] ----------------------------------------------------------------------------------

/**
 * Set propper Date() and URL() Object where nessesary
 *
 * @param rawEvent
 * @returns Xioni XioniEvent
 */

function eventAdapter(rawEvent: any): XioniEvent {
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

export const getEvents = XioniEvents().getEvents

export const getEvent = XioniEvents().getEvent
