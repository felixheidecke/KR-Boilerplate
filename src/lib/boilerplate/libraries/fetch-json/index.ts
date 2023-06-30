import { FetchMethods, type FetchParams, type FetchResponse } from './types'

export default function (fetchFn: typeof fetch = fetch) {
	return async function (
		url: string | Array<string | number>,
		params: FetchParams = {}
	): Promise<FetchResponse> {
		if (Array.isArray(url)) {
			url = url.join('/')
		}

		const remoteURL = new URL(url)
		const method = params.method || FetchMethods.GET
		const headers = { 'Content-Type': 'application/json', ...params.headers }
		const body = params.data ? JSON.stringify(params.data) : undefined

		if (params.params && Object.keys(params.params).length) {
			remoteURL.search = new URLSearchParams(params.params as any).toString()
		}

		const response = await fetchFn(remoteURL.toString(), {
			method,
			headers,
			body
		})

		return {
			data: await response.json(),
			ok: response.status < 400,
			status: response.status,
			url: response.url
		}
	}
}
