import { FetchMethods, FetchResponseStatus, type FetchParams, type FetchResponse } from './types'

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
			credentials: 'include',
			headers,
			body
		})

		return {
			data: response.status !== 202 ? await response.json() : {},
			status: getStatus(response.status),
			statusCode: response.status,
			url: response.url
		}
	}
}

function getStatus(statusCode: number) {
	if (statusCode < 200) {
		return FetchResponseStatus.INFORMAL
	} else if (statusCode < 300) {
		return FetchResponseStatus.SUCCESS
	} else if (statusCode < 400) {
		return FetchResponseStatus.REDIRECT
	} else if (statusCode < 500) {
		return FetchResponseStatus.CLIENT_ERROR
	} else {
		return FetchResponseStatus.SERVER_ERROR
	}
}
