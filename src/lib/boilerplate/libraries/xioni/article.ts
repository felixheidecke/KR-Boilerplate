import { fromUnixTime } from 'date-fns'
import FetchJSON from '$lib/boilerplate/libraries/fetch-json'
import { XIONI_API_URL } from '$lib/boilerplate/constants'
import type { XioniArticle, XioniArticles } from './article.types'

export default (fetchFn: typeof fetch = fetch) => {
	const fetchJSON = FetchJSON(fetchFn)
	/**
	 * Get all articles by module
	 *
	 * @param module Module id
	 * @param limit Limit number of articles
	 * @returns XioniArticles
	 */

	async function getAll(module: number, filter: { limit?: number; expanded?: boolean } = {}) {
		const params = {}

		if ('limit' in filter) {
			Object.assign(params, { limit: filter.limit })
		}

		if ('expanded' in filter) {
			Object.assign(params, { expanded: 1 })
		}

		const response = await fetchJSON([XIONI_API_URL, 'articles', module], { params })

		if (!response.ok) return

		return response.data.map(articleAdapter) as XioniArticles
	}

	/**
	 * Get a single XioniArticle
	 *
	 * @param id XioniArticle id
	 * @returns XioniArticle
	 */

	async function getOne(id: number) {
		const response = await fetchJSON([XIONI_API_URL, 'article', id])

		if (!response.ok) return

		return articleAdapter(response.data) as XioniArticle
	}

	/**
	 * Get all artciles in a given category
	 *
	 * @param category Category ID
	 * @param limit Limit number of articles
	 * @returns XioniArticles
	 */

	async function getByCategory(category: number, limit?: number) {
		const params = {}

		if (category) {
			Object.assign(params, { category })
		}

		if (limit) {
			Object.assign(params, { limit })
		}

		const { data, ok } = await fetchJSON([XIONI_API_URL, 'articles'], { params })

		if (!ok) return

		return data.map(articleAdapter) as XioniArticles
	}

	// Helper
	function articleAdapter(rawArticle: any) {
		return {
			...rawArticle,
			date: fromUnixTime(rawArticle.date)
		}
	}

	return {
		getAll,
		getOne,
		getByCategory
	}
}
