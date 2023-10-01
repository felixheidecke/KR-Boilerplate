import { xioniFetch } from '../utils/xioniFetch'

import type { XioniFetchErrorResponse } from '../utils/xioniFetch'
import type { XioniCMS } from '../types'

// --- Factory -------------------------------------------------------------------------------------

export default function useArticles(fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)

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
	): Promise<XioniCMS.Article[]> {
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

		return new Promise(async (resolve, reject) => {
			const response = await fetch(['cms/articles', module], { params })

			if (response.status === 'success') {
				resolve((response.data as []).map(articleAdapter) as XioniCMS.Article[])
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	/**
	 * Get a single XioniArticle
	 *
	 * @param id article id
	 * @returns An article
	 */

	async function getArticle(module: number, id: number): Promise<XioniCMS.Article> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['cms/articles', module, id])

			if (response.status === 'success') {
				resolve(articleAdapter(response.data) as XioniCMS.Article)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
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
		getArticle
	}
}

export const getArticles = useArticles().getArticles
export const getArticle = useArticles().getArticle
