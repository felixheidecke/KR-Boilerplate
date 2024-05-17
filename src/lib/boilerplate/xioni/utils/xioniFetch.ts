import xinoiConfig from '$lib/app.config'
import FetchJson from '../../../utils/fetch-json'

import type { FetchParams, FetchResponse } from '../../../utils/fetch-json/types'

export type XioniFetchResponse<T = unknown> = FetchResponse<T>

export type XioniFetchErrorResponse = FetchResponse<{
	message: string
	code?: string
	details?: any
}>

/**
 * Fetch Factory
 * @param fetchFn fetch function
 * @returns
 */

export function xioniFetch(fetchFn: typeof fetch = fetch) {
	const fetch = FetchJson(fetchFn)

	/**
	 * Fetch JSON data from api.klickrhein.de
	 * @param path Array items will form path: ['foo','bar'] = 'foo/bar'
	 */
	return async function (path: Array<string | number | undefined>, params: FetchParams = {}) {
		const { url, key } = xinoiConfig?.api || {}

		const normalPath = path.filter(item => item !== undefined) as Array<string | number>
		const response = await fetch([url, ...normalPath], {
			...params,
			headers: {
				apikey: key
			}
		})

		return response
	}
}
