import xinoiConfig from '$lib/app.config'
import fetchJSON, { type FetchJSON } from '$lib/boilerplate/utils/fetchJSON'

export type XioniFetchErrorResponse = FetchJSON.Response<{
	message: string
	code?: string
	details?: Record<string, string | string[]> | string[]
}>

/**
 * Fetch Factory
 * @param fetchFn fetch function
 * @returns
 */

export function xioniFetch(fetchFn: typeof fetch = fetch) {
	const fetch = fetchJSON(fetchFn)

	/**
	 * Fetch JSON data from api.klickrhein.de
	 * @param path Array items will form path: ['foo','bar'] = 'foo/bar'
	 */
	return async function (path: Array<string | number | undefined>, params: FetchJSON.Params = {}) {
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
