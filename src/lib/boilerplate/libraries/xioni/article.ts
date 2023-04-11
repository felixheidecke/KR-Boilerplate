import FetchJSON from '$lib/boilerplate/libraries/fetch-json'
import { XIONI_API_URL } from '$lib/boilerplate/constants'
import type { XioniArticle, XioniArticles } from './article.types'

export default function XioniArticleApi(fetchFn: typeof fetch = fetch) {
	const fetchJSON = FetchJSON(fetchFn)

	/**
	 * Get all articles by module
	 *
	 * @param module Module id
	 * @param limit Limit number of articles
	 * @returns XioniArticles
	 */

	async function getMany(
		module: number,
		filter: { limit?: number; full?: false; status?: 'live' | 'archived' } = {}
	) {
		const params = {}

		if ('limit' in filter) {
			Object.assign(params, { limit: filter.limit })
		}

		if ('full' in filter) {
			Object.assign(params, { full: filter.full })
		}

		if ('status' in filter) {
			Object.assign(params, { status: filter.status })
		}

		const { data, ok } = await fetchJSON([XIONI_API_URL, 'articles', module], { params })

		if (!ok) return

		return data.map(articleAdapter) as XioniArticles
	}

	/**
	 * Get a single XioniArticle
	 *
	 * @param id XioniArticle id
	 * @returns XioniArticle
	 */

	async function getOne(id: number, filter: { full?: boolean } = {}) {
		const params = {}

		if ('full' in filter) {
			Object.assign(params, { full: filter.full })
		}

		const { data, ok } = await fetchJSON([XIONI_API_URL, 'article', id], { params })

		if (!ok) return

		return articleAdapter(data) as XioniArticle
	}

	/**
	 * Get all artciles in a given category
	 *
	 * @param category Category ID
	 * @param limit Limit number of articles
	 * @returns XioniArticles
	 */

	async function getByCategory(category: number, filter: { limit?: number } = {}) {
		const params = { category }

		if ('filter' in filter) {
			Object.assign(params, { limit: filter.limit })
		}

		const { data, ok } = await fetchJSON([XIONI_API_URL, 'articles'], { params })

		if (!ok) return

		return data.map(articleAdapter) as XioniArticles
	}

	// Remap response data
	function articleAdapter(rawArticle: any) {
		return {
			...rawArticle,
			date: new Date(rawArticle.date)
		}
	}

	return {
		getMany,
		getOne,
		getByCategory
	}
}

export const getMany = XioniArticleApi().getMany

export const getOne = XioniArticleApi().getOne

export const getByCategory = XioniArticleApi().getByCategory
