import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import type { XioniCMS, XioniCMSData } from '../xioniCMS.types'

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
		query: {
			limit?: number
			archived?: boolean
			parts?: 'content'[]
		} = {}
	): Promise<XioniCMSData<XioniCMS.Article[]>> {
		const context = { emitter: 'getArticles' }
		const params = {}

		if ('limit' in query) {
			Object.assign(params, { limit: query.limit })
		}

		if ('archived' in query) {
			Object.assign(params, { archived: query.archived })
		}

		if ('parts' in query && query.parts?.length) {
			Object.assign(params, { parts: query.parts.join() })
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
		$event: event
	}
}

export const getArticles = useArticles().getArticles

export const getArticle = useArticles().getArticle
