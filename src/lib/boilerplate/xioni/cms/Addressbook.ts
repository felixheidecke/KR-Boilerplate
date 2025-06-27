import { ApiPaths, type operations } from '../api/api.d'
import { fetchWithErrorHandling } from '../utils/fetchWithErrorResponse'
import { mapDtoAddressbookCategory, mapDtoAddressbookEntry } from '../mapper/dtoAddressbookMapper'
import { type ClientOptions } from 'openapi-fetch'
import createClient from '../api/client'

export function useAddressbook(clientOptions?: ClientOptions) {
	const client = createClient(clientOptions)

	async function getCategories(
		moduleId: number,
		query: {
			limit?: string | number
			offset?: string | number
			order?: string
			parts?: 'entries'[]
		} = {}
	) {
		const requestQuery: operations['getCategories']['parameters']['query'] = {}

		if ('limit' in query) {
			requestQuery.limit = Number(query.limit)
		}

		if ('offset' in query) {
			requestQuery.offset = Number(query.offset)
		}

		if ('order' in query) {
			requestQuery.order = query.order
		}

		if ('parts' in query) {
			requestQuery.include = query.parts
		}

		const data = await fetchWithErrorHandling(() =>
			client.GET(ApiPaths.getCategories, {
				params: {
					path: { moduleId },
					query: requestQuery
				}
			})
		)

		return {
			meta: data.meta,
			categories: data.categories.map(mapDtoAddressbookCategory)
		}
	}

	async function getEntries(
		moduleId: number,
		query: {
			limit?: string | number
			offset?: string | number
			order?: string
		} = {}
	) {
		const requestQuery: operations['getCategories']['parameters']['query'] = {}

		if ('limit' in query) {
			requestQuery.limit = Number(query.limit)
		}

		if ('offset' in query) {
			requestQuery.offset = Number(query.offset)
		}

		if ('order' in query) {
			requestQuery.order = query.order
		}

		const data = await fetchWithErrorHandling(() =>
			client.GET(ApiPaths.getEntries, {
				params: {
					path: { moduleId },
					query: requestQuery
				}
			})
		)

		return {
			meta: data.meta,
			entries: data.entries.map(mapDtoAddressbookEntry)
		}
	}

	// --- Mappers -----------------------------------------------------------------------------------

	return {
		getCategories,
		getEntries
	}
}

export const getCategories = useAddressbook().getCategories
export const getEntries = useAddressbook().getEntries
