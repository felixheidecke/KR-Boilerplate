import type { XioniArticle, XioniArticles } from './article.types'
import XioniFetch from '../xioni-fetch'

export default function XioniArticleApi(fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

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

		const artciles = await xioniFetch(['articles', module], { params })

		if (!artciles.ok) return null

		return (artciles.data as object[]).map(articleAdapter) as XioniArticles
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

		const article = await xioniFetch(['article', id], { params })

		if (!article.ok) return

		return articleAdapter(article.data) as XioniArticle
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

		const { data, ok } = await xioniFetch(['articles'], { params })

		if (!ok) return

		return (data as object[]).map(articleAdapter) as XioniArticles
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
