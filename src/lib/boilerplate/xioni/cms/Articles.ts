import { dev } from '$app/environment'
import { LOCALE } from '$lib/boilerplate/constants'
import createClient from '../api/client'
import type { ClientOptions } from 'openapi-fetch'
import { ApiPaths, type components, type operations, type SchemaArticle } from '../api/api'
import type { XioniCMS } from '../types'

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

		try {
			const { data, error } = await client.GET(ApiPaths.getArticles, {
				params: {
					path: { moduleId },
					query: requestQuery
				}
			})

			return {
				meta: data?.meta,
				articles: data?.articles?.map(articleAdapter)
			}
		} catch (error) {
			if (dev) console.error(error)

			throw error
		}
	}

	/**
	 * Get a single XioniArticle
	 *
	 * @param id article id
	 * @returns An article
	 */

	async function getArticle(moduleId: number, articleId: number) {
		try {
			const { data, error, response } = await client.GET(ApiPaths.getArticle, {
				params: {
					path: { moduleId, articleId }
				}
			})

			if (dev) console.log(response)

			if (error) throw error

			return {
				article: articleAdapter(data?.article as SchemaArticle)
			}
		} catch (error) {
			if (dev) console.error(error)

			throw error
		}
	}

	// Remap response data
	function articleAdapter(article: SchemaArticle): XioniCMS.Article {
		return {
			...article,
			date: new Date(article.date),
			website: article.website ? new URL(article.website) : null
		}
	}

	return {
		getArticles,
		getArticle
	}
}

export const getArticles = useArticles().getArticles
export const getArticle = useArticles().getArticle
