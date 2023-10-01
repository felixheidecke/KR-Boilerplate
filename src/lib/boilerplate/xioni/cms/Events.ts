import { xioniFetch } from '../utils/xioniFetch'
import { formatFromTo } from '$lib/boilerplate/utils/formatDate'

import type { XioniCMS } from '../types'
import type { XioniFetchErrorResponse } from '../utils/xioniFetch'

// --- Factory -------------------------------------------------------------------------------------

export default function useEvents(fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)

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
		query: {
			limit?: number
			startsBefore?: Date
			startsAfter?: Date
			endsBefore?: Date
			endsAfter?: Date
			parts?: Array<'images' | 'flags'>
		} = {}
	): Promise<XioniCMS.Event[]> {
		const params = {}

		if (query.limit && query.limit > 0) {
			Object.assign(params, { limit: query.limit })
		}

		if (query.parts && query.parts.length) {
			Object.assign(params, { parts: query.parts.join() })
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

		return new Promise(async (resolve, reject) => {
			const response = await fetch(['cms/events', module], { params })

			if (response.status === 'success') {
				resolve((response.data as []).map(eventAdapter) as XioniCMS.Event[])
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	/**
	 * Get a single XioniEvent
	 *
	 * @param id XioniEvent id
	 * @returns XioniEvent
	 */

	async function getEvent(module: number, id: number): Promise<XioniCMS.Event> {
		const context = { emitter: 'getEvent' }

		return new Promise(async (resolve, reject) => {
			const response = await fetch(['cms/events', module, id])

			if (response.status === 'success') {
				resolve(eventAdapter(response.data) as XioniCMS.Event)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	return {
		getEvents,
		getEvent
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
