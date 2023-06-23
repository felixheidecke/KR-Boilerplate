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

		try {
			const response = await fetchFn(remoteURL.toString(), {
				method,
				headers,
				body
			})

			const isJsonContent = response.headers.get('content-type')?.includes('application/json')

			if (!isJsonContent) {
				console.error(response.text())
			}

			return {
				data: isJsonContent ? await response.json() : null,
				ok: response.status < 400 && !!isJsonContent,
				status: response.status,
				url: response.url
			}
		} catch (error) {
			console.error(error)

			return {
				data: '',
				ok: false,
				status: 500,
				url: remoteURL.toString()
			}
		}
	}
}
