import type { FetchParams, FetchResponse } from './types'

export default function (fetchFn: typeof fetch = fetch) {
	return async function (
		url: string | Array<string | number>,
		params: FetchParams = {}
	): Promise<FetchResponse> {
		if (Array.isArray(url)) {
			url = url.join('/')
		}

		const remoteURL = new URL(url)
		const method = params.method || 'GET'
		const body = params.data ? JSON.stringify(params.data) : undefined
		const headers = !body
			? { ...params.headers }
			: { 'Content-Type': 'application/json', ...params.headers }

		if (params.params && Object.keys(params.params).length) {
			remoteURL.search = new URLSearchParams(params.params as any).toString()
		}

		try {
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
		} catch {
			throw {
				data: {},
				status: getStatus(500),
				statusCode: 500
			}
		}
	}
}

function getStatus(statusCode: number) {
	if (statusCode < 200) {
		return 'informal'
	} else if (statusCode < 300) {
		return 'success'
	} else if (statusCode < 400) {
		return 'redirect'
	} else if (statusCode < 500) {
		return 'client-error'
	} else {
		return 'server-error'
	}
}
