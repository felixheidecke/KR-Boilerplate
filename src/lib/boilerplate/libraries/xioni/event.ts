import { XIONI_API_URL } from '$lib/boilerplate/constants'
import FetchJSON from '$lib/boilerplate/libraries/fetch-json'
import type { XioniEvent } from './event.types'

export default (fetchFn: typeof fetch = fetch) => {
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

		const events = data.map(eventAdapter) as XioniEvent[]

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

	async function getOne(id: number, callback: Function | undefined = undefined) {
		const { ok, data } = await fetchJSON([XIONI_API_URL, 'event', id])

		if (!ok) return

		const event = eventAdapter(data)

		if (callback) {
			callback(event)
			return
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
	const event = {
		...rawEvent,
		starts: new Date(rawEvent.starts),
		ends: new Date(rawEvent.ends)
	}

	if (rawEvent.website) {
		event.website = new URL(rawEvent.website)
	}

	if (rawEvent.ticketshop) {
		event.ticketshop = new URL(rawEvent.ticketshop)
	}

	return event
}
