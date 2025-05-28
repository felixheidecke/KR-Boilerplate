import { ApiPaths, type operations, type SchemaEvent } from '../api/api.d'
import { dev } from '$app/environment'
import { formatFromTo } from '$lib/boilerplate/utils/formatDate'
import createClient from '../api/client'
import type { ClientOptions } from 'openapi-fetch'
import type { XioniCMS } from '../types'
import { fetchWithErrorHandling } from '../utils/fetchWithErrorResponse'

type GetEventResponse = {
	event: XioniCMS.Event
}

// --- Factory -------------------------------------------------------------------------------------

export default function useEvents(clientOptions?: ClientOptions) {
	const client = createClient(clientOptions)

	/**
	 * Get all Events by module ----------------------------------------------------------------------
	 *
	 * @param module Module id
	 * @param filter.limit Maximale Anzahl an Artikeln
	 * @param filter.startsBefore Event startet vor Datum
	 * @param filter.startsAfter Event startet nach Datum
	 * @param filter.endsBefore Event endet vor Datum
	 * @param filter.endsAfter Event endet nach Datum
	 */

	type GetEventsQuery = {
		limit?: number
		offset?: number
		order?: string
		endsAfter?: Date
		startsAfter?: Date
		endsBefore?: Date
		parts?: ('flags' | 'tags' | 'images')[]
	}

	type GetEventsResponse = {
		events: XioniCMS.Event[]
		meta: {
			totalCount: number
		}
	}

	async function getEvents(
		moduleId: number,
		{ limit, offset, order, endsAfter, startsAfter, endsBefore, parts }: GetEventsQuery = {}
	): Promise<GetEventsResponse> {
		const query: operations['getEvents']['parameters']['query'] = {}

		if (limit && limit > 0) {
			query.limit = Number(limit)
		}

		if (order) {
			query.order = order
		}

		if (offset && offset > 0) {
			query.offset = Number(offset)
		}

		if (parts && parts.length) {
			query.parts = parts
		}

		if (startsAfter) {
			query.startsAfter = startsAfter.toDateString()
		}

		if (endsBefore) {
			query.endsBefore = endsBefore.toDateString()
		}

		if (endsAfter) {
			query.endsAfter = endsAfter.toDateString()
		}

		const data = await fetchWithErrorHandling(() =>
			client.GET(ApiPaths.getEvents, {
				params: {
					query,
					path: { moduleId }
				}
			})
		)

		return {
			// TODO: Remove any
			meta: data.meta as any,
			events: data.events.map(eventAdapter)
		}
	}

	/**
	 * Get a single XioniEvent
	 *
	 * @param id XioniEvent id
	 * @returns XioniEvent
	 */

	async function getEvent(moduleId: number, eventId: number): Promise<GetEventResponse> {
		try {
			const { data, error } = await client.GET(ApiPaths.getEvent, {
				params: {
					path: { moduleId, eventId }
				}
			})

			// Forward to catch block
			// TODO: Get rid of data check
			if (error || !data) throw error

			return {
				// TODO: Remove any
				event: eventAdapter(data.event as any)
			}
		} catch (error) {
			if (dev) {
				console.error(error)
			}

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

function eventAdapter(dto: SchemaEvent): XioniCMS.Event {
	const starts = new Date(dto.starts)
	const ends = new Date(dto.ends)
	const event: XioniCMS.Event = {
		...dto,
		starts,
		ends,
		duration: formatFromTo(starts, ends)
	}

	if (dto.website) {
		event.website = new URL(dto.website)
	}

	if (dto.ticketshopURL) {
		event.ticketshopURL = new URL(dto.ticketshopURL)
	}

	return event
}
