import { FetchMethods, type FetchParams, type FetchResponse } from './types'

export default function (fetchFn: typeof fetch = fetch) {
	return async function (
		url: string | Array<string | number>,
		params: FetchParams = {}
	): Promise<FetchResponse> {
		if (Array.isArray(url)) {
			url = url.join('/')
		}

		const newURL = new URL(url)
		const method = params.method || FetchMethods.GET
		const headers = { 'Content-Type': 'application/json', ...params.headers }
		const body = params.data ? JSON.stringify(params.data) : undefined

		if (params.params && Object.keys(params.params).length) {
			newURL.search = new URLSearchParams(params.params as any).toString()
		}

		try {
			const response = await fetchFn(newURL.toString(), {
				method,
				headers,
				body
			})

			return {
				data: await response.json(),
				status: response.status,
				ok: response.status < 400
			}
		} catch (error) {
			console.error(error)
			throw `Failed to fetch ${url.toString()}`
		}
	}
}
