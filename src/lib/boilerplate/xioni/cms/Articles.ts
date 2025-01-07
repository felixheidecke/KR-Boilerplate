import { dev } from '$app/environment'
import { LOCALE } from '$lib/boilerplate/constants'
import Axios from 'axios'
import config from '$lib/app.config'
import type { XioniCMS } from '../types'

export function useArticles(fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: config.api.url,
		headers: { 'api-key': config.api.key }
	})

	/**
	 * Get all articles by module
	 *
	 * @param module Module id
	 * @param limit Limit number of articles
	 * @returns List of articles
	 */

	async function getArticles(
		module: number,
		query: {
			limit?: string | number
			offset?: string | number
			archived?: boolean
			parts?: 'content'[]
			createdAfter?: Date
		} = {}
	) {
		const params = {}

		if ('limit' in query) {
			Object.assign(params, { limit: Number(query.limit) })
		}

		if ('offset' in query) {
			Object.assign(params, { offset: Number(query.offset) })
		}

		if ('archived' in query) {
			Object.assign(params, { archived: query.archived })
		}

		if ('parts' in query && query.parts?.length) {
			Object.assign(params, { parts: query.parts.join() })
		}

		if ('archived' in query) {
			Object.assign(params, { createdAfter: query.createdAfter?.toLocaleDateString(LOCALE) })
		}

		try {
			const { data } = await axios.get<{
				articles: XioniCMS.Article[]
				meta: {
					totalCount: number
				}
			}>(`/cms/articles/${module}`, {
				params
			})

			return {
				meta: data.meta,
				articles: data.articles.map(articleAdapter)
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

	async function getArticle(
		module: number,
		id: number
	): Promise<{
		article: XioniCMS.Article
	}> {
		try {
			const { data } = await axios.get(`/cms/articles/${module}/${id}`)

			return {
				article: articleAdapter(data.article)
			}
		} catch (error) {
			if (dev) console.error(error)

			throw error
		}
	}

	// Remap response data
	function articleAdapter(article: any): XioniCMS.Article {
		return {
			...article,
			date: new Date(article.date),
			website: article.website ? new URL(article.website) : undefined
		}
	}

	return {
		getArticles,
		getArticle
	}
}

export const getArticles = useArticles().getArticles
export const getArticle = useArticles().getArticle
