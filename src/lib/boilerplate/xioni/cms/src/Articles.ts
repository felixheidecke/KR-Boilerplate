import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import type { XioniCMS, XioniCMSData } from '../XioniCMS.types'
import type { Xioni } from '../../Xioni.types'

export function useArticles(fetchFn: typeof fetch = fetch) {
	const fetchJson = xioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get all articles by module
	 *
	 * @param module Module id
	 * @param limit Limit number of articles
	 * @returns List of articles
	 */

	async function getArticles(
		module: number,
		filter: { limit?: number; status?: 'live' | 'archived' } = {},
		detailLevel?: Xioni.DetailLevel.MINIMAL | Xioni.DetailLevel.EXTENDED
	): Promise<XioniCMSData<XioniCMS.Article[]>> {
		const context = { emitter: 'getArticles' }
		const params = {}

		if (filter.limit) {
			Object.assign(params, { limit: filter.limit })
		}

		if (filter.status) {
			Object.assign(params, { status: filter.status })
		}

		if (detailLevel) {
			Object.assign(params, { detailLevel })
		}

		const response = await fetchJson(['cms/articles', module], { params })

		if (response.status === 'success') {
			const articles = (response.data as []).map(articleAdapter) as XioniCMS.Article[]

			event.emit('loaded', articles, context)
			event.emit('finally', context)

			return [articles, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	/**
	 * Get a single XioniArticle
	 *
	 * @param id article id
	 * @returns An article
	 */

	async function getArticle(module: number, id: number): Promise<XioniCMSData<XioniCMS.Article>> {
		const context = { emitter: 'getArticle' }

		const response = await fetchJson(['cms/articles', module, id])

		if (response.status === 'success') {
			const article = articleAdapter(response.data) as XioniCMS.Article

			event.emit('loaded', article, context)
			event.emit('finally', context)

			return [article, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	/**
	 * Get all artciles in a given category
	 *
	 * @param category Category ID
	 * @param limit Limit number of articles
	 * @returns XioniCMS.Articles
	 */

	async function getArticlesByCategory(
		category: number,
		filter: { limit?: number } = {}
	): Promise<XioniCMSData<XioniCMS.Article[]>> {
		const params = { category }
		const context = { emitter: 'getArticlesByCategory' }

		if ('filter' in filter) {
			Object.assign(params, { limit: filter.limit })
		}

		const response = await fetchJson(['cms/articles'], { params })

		if (response.status === 'success') {
			const articles = articleAdapter(response.data) as XioniCMS.Article[]

			event.emit('loaded', articles, context)
			event.emit('finally', context)

			return [articles, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
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
		getArticlesByCategory,
		$event: event
	}
}

export const getArticles = useArticles().getArticles

export const getArticle = useArticles().getArticle

export const getArticlesByCategory = useArticles().getArticlesByCategory
