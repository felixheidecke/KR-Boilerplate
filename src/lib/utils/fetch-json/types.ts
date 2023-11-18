export interface FetchParams {
	method?: 'GET' | 'POST' | 'PUT' | 'UPDATE' | 'PATCH' | 'DELETE'
	headers?: object
	params?: object
	data?: object
}

export interface FetchResponse<T = unknown> {
	data: T
	status: 'informal' | 'success' | 'redirect' | 'client-error' | 'server-error'
	statusCode: number
	url: string
}
