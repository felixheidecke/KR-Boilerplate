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
		filter: { limit?: number; parts?: 'content'; status?: 'live' | 'archived' } = {}
	): Promise<XioniResponse<XioniArticle[]>> {
		const params = {}

		if ('limit' in filter) {
			Object.assign(params, { limit: filter.limit })
		}

		if ('parts' in filter) {
			Object.assign(params, { parts: filter.parts })
		}

		if ('status' in filter) {
			Object.assign(params, { status: filter.status })
		}

		const { status, data } = await xioniFetch(['articles', module], { params })

		if (status === FetchResponseStatus.SUCCESS) {
			return [undefined, data.map(articleAdapter)]
		} else {
			return [data, undefined]
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

		if ('full' in filter) {
			Object.assign(params, { full: filter.full })
		}

		const { status, data } = await xioniFetch(['article', id], { params })

		if (status === FetchResponseStatus.SUCCESS) {
			return [undefined, articleAdapter(data)]
		} else {
			return [data, undefined]
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

		const { status, data } = await xioniFetch(['articles'], { params })

		if (status === FetchResponseStatus.SUCCESS) {
			return [undefined, data.map(articleAdapter)]
		} else {
			return [data, undefined]
		}
	}

	// Remap response data
	function articleAdapter(rawArticle: any) {
		return {
			...rawArticle,
			date: new Date(rawArticle.date)
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
