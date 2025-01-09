import { API_BASE_URL } from '../constants'
import { dev } from '$app/environment'
import { formatFromTo } from '$lib/boilerplate/utils/formatDate'
import Axios from 'axios'
import config from '$lib/app.config'
import type { XioniCMS } from '../types'

type GetEventResponse = {
	event: XioniCMS.Event
}

type GetEventsResponse = {
	events: XioniCMS.Event[]
	meta: {
		totalCount: number
	}
}

// --- Factory -------------------------------------------------------------------------------------

export default function useEvents(fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: new URL('v6', API_BASE_URL).toString(),
		headers: {
			'api-key': config.krApiKey
		}
	})

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
			parts?: Array<'images' | 'flags' | 'tags'>
		} = {}
	): Promise<GetEventsResponse> {
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

		try {
			const { data } = await axios.get(`cms/events/${module}`, {
				params
			})

			return {
				meta: data.meta,
				events: data.events.map(eventAdapter)
			}
		} catch (error) {
			if (dev) console.error(error)

			throw error
		}
	}

	/**
	 * Get a single XioniEvent
	 *
	 * @param id XioniEvent id
	 * @returns XioniEvent
	 */

	async function getEvent(module: number, id: number): Promise<GetEventResponse> {
		try {
			const { data } = await axios.get(`cms/events/${module}/${id}`)

			return {
				event: eventAdapter(data.event)
			}
		} catch (error) {
			if (dev) console.error(error)

			throw error
		}
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
 * @param dto
 * @returns Xioni XioniEvent
 */

function eventAdapter(dto: any): XioniCMS.Event {
	const starts = new Date(dto.starts)
	const ends = new Date(dto.ends)
	const event = {
		...dto,
		starts,
		ends,
		duration: formatFromTo(starts, ends)
	}

	if (dto.website) {
		event.website = new URL(dto.website)
	}

	if (dto.ticketshop) {
		event.ticketshop = new URL(dto.ticketshop)
	}

	return event
}
