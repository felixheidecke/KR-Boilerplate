import { XIONI_API_URL } from '$lib/boilerplate/constants'
import FetchJson from '../fetch-json'
import type { FetchParams } from '../fetch-json/types'
import type { XioniFetchResponse } from './types'

export default function (fetchFn: typeof fetch = fetch) {
	const fetchJson = FetchJson(fetchFn)

	return async function (path: string | Array<string | number>, params: FetchParams = {}) {
		try {
			if (!Array.isArray(path)) {
				path = [path]
			}

			return (await fetchJson([XIONI_API_URL, ...path], params)) as XioniFetchResponse
		} catch (error) {
			console.error(error)

			return {
				data: null,
				ok: false,
				status: 0
			} as XioniFetchResponse
		}
	}
}
