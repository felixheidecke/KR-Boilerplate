export namespace FetchJSON {
	export interface Params {
		method?: 'GET' | 'POST' | 'PUT' | 'UPDATE' | 'PATCH' | 'DELETE'
		headers?: object
		params?: object
		data?: object
	}

	export interface Response<T = unknown> {
		data: T
		status: 'informal' | 'success' | 'redirect' | 'client-error' | 'server-error'
		statusCode: number
		url: string
	}
}

export default function (fetchFn: typeof fetch = fetch) {
	return async function (
		url: string | Array<string | number>,
		params: FetchJSON.Params = {}
	): Promise<FetchJSON.Response> {
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
				data: response.status !== 204 ? await response.json() : {},
				status: getStatus(response.status),
				statusCode: response.status,
				url: response.url
			}
		} catch (error) {
			throw {
				data: error,
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
