import { ApiPaths, type operations, type SchemaEvent } from '../api/api.d'
import { dev } from '$app/environment'
import { fetchWithErrorHandling } from '../utils/fetchWithErrorResponse'
import { mapDtoEvent } from '../mapper/dtoEventMapper'
import createClient from '../api/client'
import type { ClientOptions } from 'openapi-fetch'
import type { XioniCMS } from '../types'

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
			meta: data.meta as GetEventsResponse['meta'],
			events: data.events.map(mapDtoEvent)
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
				event: mapDtoEvent(data.event as SchemaEvent)
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
