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

	async function getMany(
		module: number,
		filter: {
			limit?: number
			startsBefore?: string | Date
			startsAfter?: string | Date
			endsBefore?: string | Date
			endsAfter?: string | Date
		} = {}
	) {
		const params = {}

		if ('limit' in filter) {
			Object.assign(params, { limit: filter.limit })
		}

		if (filter.endsBefore) {
			Object.assign(params, { endsBefore: parseDate(filter.endsBefore) })
		}

		if (filter.endsAfter) {
			Object.assign(params, { endsAfter: parseDate(filter.endsAfter) })
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

	return {
		getMany,
		getOne
	}
}

function parseDate(date: string | Date) {
	if (date === 'today') {
		return new Date().toDateString()
	}

	return date
}
