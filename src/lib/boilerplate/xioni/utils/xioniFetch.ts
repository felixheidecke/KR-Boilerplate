import { xinoiConfig } from '$lib/config'
import FetchJson from '../../../utils/fetch-json'

// --- [ Types ] -----------------------------------------------------------------------------------

import type { FetchParams, FetchResponse } from '../../../utils/fetch-json/types'

export type XioniFetchResponse<T = unknown> = FetchResponse<T>

export type XioniFetchErrorResponse = FetchResponse<{
	message: string
	code?: string
	payload?: [string, string][]
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
		const normalPath = path.filter(item => item !== undefined) as Array<string | number>
		const response = await fetch([xinoiConfig.apiPath, ...normalPath], params)

		return response
	}
}
