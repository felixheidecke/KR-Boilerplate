import { FetchResponseStatus } from '../../../utils/fetch-json/types'
import { XioniFetch } from '../../xioni-fetch'
import EventEmitter from 'eventemitter3'

import type { XioniCMS, XioniResponse } from '../types'
import type { XioniFetchErrorResponse } from '../../xioni-fetch/types'

export function ArticlesFactory(fetchFn: typeof fetch = fetch) {
	const fetchJSON = XioniFetch(fetchFn)
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
		filter: { limit?: number; status?: 'live' | 'archived' } = {}
	): Promise<XioniResponse<XioniCMS.Article[]>> {
		const context = { emitter: 'getArticles' }
		const params = {}

		event.emit('loading', context)

		if (filter.limit) {
			Object.assign(params, { limit: filter.limit })
		}

		if (filter.status) {
			Object.assign(params, { status: filter.status })
		}

		const response = await fetchJSON(['cms/articles', module], { params })

		if (response.status === FetchResponseStatus.SUCCESS) {
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

	async function getArticle(id: number): Promise<XioniResponse<XioniCMS.Article>> {
		const context = { emitter: 'getArticle' }

		event.emit('loading', context)

		const response = await fetchJSON(['cms/article', id])

		if (response.status === FetchResponseStatus.SUCCESS) {
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
	): Promise<XioniResponse<XioniCMS.Article[]>> {
		const params = { category }
		const context = { emitter: 'getArticlesByCategory' }

		event.emit('loading', context)

		if ('filter' in filter) {
			Object.assign(params, { limit: filter.limit })
		}

		const response = await fetchJSON(['cms/articles'], { params })

		if (response.status === FetchResponseStatus.SUCCESS) {
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

export const getArticles = ArticlesFactory().getArticles

export const getArticle = ArticlesFactory().getArticle

export const getArticlesByCategory = ArticlesFactory().getArticlesByCategory
