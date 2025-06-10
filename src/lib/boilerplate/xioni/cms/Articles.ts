import { ApiPaths, type operations } from '../api/api.d'
import { fetchWithErrorHandling } from '../utils/fetchWithErrorResponse'
import { LOCALE } from '$lib/boilerplate/constants'
import { mapDtoArticle } from '../mapper/dtoArticleMapper'
import { type ClientOptions } from 'openapi-fetch'
import createClient from '../api/client'

export function useArticles(clientOptions?: ClientOptions) {
	const client = createClient(clientOptions)

	/**
	 * Get all articles by module
	 *
	 * @param moduleId Module id
	 * @param limit Limit number of articles
	 * @returns List of articles
	 */

	async function getArticles(
		moduleId: number,
		query: {
			limit?: string | number
			offset?: string | number
			archived?: boolean
			parts?: 'content'[]
			createdAfter?: Date
		} = {}
	) {
		const requestQuery: operations['getArticles']['parameters']['query'] = {}

		if ('limit' in query) {
			requestQuery.limit = Number(query.limit)
		}

		if ('offset' in query) {
			requestQuery.offset = Number(query.offset)
		}

		if ('archived' in query) {
			requestQuery.archived = !!query.archived
		}

		if ('parts' in query && query.parts?.length) {
			requestQuery.parts = query.parts
		}

		if ('archived' in query) {
			requestQuery.createdAfter = query.createdAfter?.toLocaleDateString(LOCALE)
		}

		const data = await fetchWithErrorHandling(() =>
			client.GET(ApiPaths.getArticles, {
				params: {
					path: { moduleId },
					query: requestQuery
				}
			})
		)

		return {
			meta: data.meta,
			articles: data.articles.map(mapDtoArticle)
		}
	}

	/**
	 * Get a single XioniArticle
	 *
	 * @param id article id
	 * @returns An article
	 */

	async function getArticle(moduleId: number, articleId: number) {
		const data = await fetchWithErrorHandling(() =>
			client.GET(ApiPaths.getArticle, {
				params: {
					path: { moduleId, articleId }
				}
			})
		)

		return {
			article: mapDtoArticle(data.article)
		}
	}

	// --- Mappers -----------------------------------------------------------------------------------

	return {
		getArticles,
		getArticle
	}
}

export const getArticles = useArticles().getArticles
export const getArticle = useArticles().getArticle
