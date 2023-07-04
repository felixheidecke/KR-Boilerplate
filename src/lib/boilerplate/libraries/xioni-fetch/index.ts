import { XIONI_API_URL } from '$lib/boilerplate/constants'
import FetchJson from '../fetch-json'
import { FetchResponseStatus, type FetchParams } from '../fetch-json/types'

export default function XioniFetch(fetchFn: typeof fetch = fetch) {
	const fetchJson = FetchJson(fetchFn)

	return async function (path: string | Array<string | number>, params: FetchParams = {}) {
		if (!Array.isArray(path)) {
			path = [path]
		}

		const response = await fetchJson([XIONI_API_URL, ...path], params)

		if (response.status === FetchResponseStatus.SERVER_ERROR) {
			throw new Error('Failed loading' + response.url)
		}

		return response
	}
}
