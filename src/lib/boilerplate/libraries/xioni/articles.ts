import XioniFetch from '../xioni-fetch'
import type { XioniResponse } from './types'
import type { XioniArticle } from './articles.types'
import { FetchResponseStatus } from '../fetch-json/types'

export default function XioniArticles(fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Get all articles by module
	 *
	 * @param module Module id
	 * @param limit Limit number of articles
	 * @returns List of articles
	 */

	async function getArticles(
		module: number,
		filter: { limit?: number; status?: 'live' | 'archived' } = {}
	): Promise<XioniResponse<XioniArticle[]>> {
		const params = {}

		if (filter.limit) {
			Object.assign(params, { limit: filter.limit })
		}

		if (filter.status) {
			Object.assign(params, { status: filter.status })
		}

		const response = await xioniFetch(['cms/articles', module], { params })

		if (response.status === FetchResponseStatus.SUCCESS) {
			return [response.data.map(articleAdapter), undefined]
		} else {
			return [undefined, response]
		}
	}

	/**
	 * Get a single XioniArticle
	 *
	 * @param id article id
	 * @returns An article
	 */

	async function getArticle(
		id: number,
		filter: { full?: boolean } = {}
	): Promise<XioniResponse<XioniArticle>> {
		const params = {}

		const response = await xioniFetch(['cms/article', id])

		if (response.status === FetchResponseStatus.SUCCESS) {
			return [articleAdapter(response.data), undefined]
		} else {
			return [undefined, response]
		}
	}

	/**
	 * Get all artciles in a given category
	 *
	 * @param category Category ID
	 * @param limit Limit number of articles
	 * @returns XioniArticles
	 */

	async function getArticlesByCategory(
		category: number,
		filter: { limit?: number } = {}
	): Promise<XioniResponse<XioniArticle[]>> {
		const params = { category }

		if ('filter' in filter) {
			Object.assign(params, { limit: filter.limit })
		}

		const response = await xioniFetch(['articles'], { params })

		if (response.status === FetchResponseStatus.SUCCESS) {
			return [response.data.map(articleAdapter), undefined]
		} else {
			return [undefined, response]
		}
	}

	// Remap response data
	function articleAdapter(article: any) {
		return {
			...article,
			date: new Date(article.date),
			website: article.website ? new URL(article.website) : undefined
		}
	}

	return {
		getArticles,
		getArticle,
		getArticlesByCategory
	}
}

export const getArticles = XioniArticles().getArticles

export const getArticle = XioniArticles().getArticle

export const getArticlesByCategory = XioniArticles().getArticlesByCategory
