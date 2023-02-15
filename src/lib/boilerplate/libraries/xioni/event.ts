import { fromUnixTime } from 'date-fns'
import { XIONI_API_URL } from '$lib/boilerplate/constants'
import FetchJSON from '$lib/boilerplate/libraries/fetch-json'
import type { XioniEvent, XioniEvents } from './event.types'

export default (fetchFn: typeof fetch = fetch) => {
	const fetchJSON = FetchJSON(fetchFn)

	/**
	 * Get all XioniEvents by module
	 *
	 * @param module Module id
	 * @param limit Limit number of XioniEvents
	 * @returns XioniEvents
	 */

	async function getAll(module: number, filter: { limit?: number } = {}) {
		const params = {}

		if ('limit' in filter) {
			Object.assign(params, { limit: filter.limit })
		}

		const { ok, data } = await fetchJSON([XIONI_API_URL, 'events', module], { params })

		if (!ok) return

		return data.map(eventsAdapter) as XioniEvents
	}

	/**
	 * Get a single XioniEvents
	 *
	 * @param id XioniEvents id
	 * @returns XioniEvents
	 */

	async function getOne(id: number) {
		const { ok, data } = await fetchJSON([XIONI_API_URL, 'event', id])

		if (!ok) return

		return eventsAdapter(data)
	}

	/**
	 * Set propper Date() and URL() Object where nessesary
	 *
	 * @param rawEvent
	 * @returns Xioni XioniEvent
	 */

	function eventsAdapter(rawEvent: any): XioniEvent {
		const event = {
			...rawEvent,
			starts: fromUnixTime(rawEvent.starts),
			ends: fromUnixTime(rawEvent.ends)
		}

		if (rawEvent.website) {
			event.website = new URL(rawEvent.website)
		}

		if (rawEvent.ticketshop) {
			event.ticketshop = new URL(rawEvent.ticketshop)
		}

		return event
	}

	return {
		getAll,
		getOne
	}
}
