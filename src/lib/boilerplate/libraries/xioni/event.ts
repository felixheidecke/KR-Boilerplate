import { XIONI_API_URL } from '$lib/boilerplate/constants'
import FetchJSON from '$lib/boilerplate/libraries/fetch-json'
import { formatFromTo } from '$lib/boilerplate/utils/format-date'
import type { XioniEvent } from './event.types'

export default function XioniEventApi(fetchFn: typeof fetch = fetch) {
	const fetchJSON = FetchJSON(fetchFn)

	/**
	 * Get all Events by module
	 *
	 * @param module Module id
	 * @param filter.limit Maximale Anzahl an Artikeln
	 * @param filter.startsBefore Event startet vor Datum
	 * @param filter.startsAfter Event startet nach Datum
	 * @param filter.endsBefore Event endet vor Datum
	 * @param filter.endsAfter Event endet nach Datum
	 * @param filter.full Get all of the data
	 */

	async function getMany(
		module: number,
		filter: {
			limit?: number
			startsBefore?: Date
			startsAfter?: Date
			endsBefore?: Date
			endsAfter?: Date
		} = {},
		callback: Function | undefined = undefined
	) {
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

		const { ok, data } = await fetchJSON([XIONI_API_URL, 'events', module], { params })

		if (!ok) return

		const events = (data as object[]).map(eventAdapter) as XioniEvent[]

		if (callback) {
			callback(events)
			return
		}

		return events
	}

	/**
	 * Get a single XioniEvent
	 *
	 * @param id XioniEvent id
	 * @returns XioniEvent
	 */

	async function getOne(id: number, callback: Function = undefined as unknown as Function) {
		const { ok, data } = await fetchJSON([XIONI_API_URL, 'event', id])

		if (!ok) return null

		const event = eventAdapter(data)

		if (callback) {
			callback(event)
		}

		return event
	}

	return {
		getMany,
		getOne
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

export const getMany = XioniEventApi().getMany

export const getOne = XioniEventApi().getOne
