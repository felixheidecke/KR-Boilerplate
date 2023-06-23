export enum FetchMethods {
	GET = 'GET',
	POST = 'POST',
	UPDATE = 'UPDATE',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}

export interface FetchParams {
	method?: FetchMethods
	headers?: object
	params?: object
	data?: object
}

export interface FetchResponse {
	data: object | object[] | string
	status: number
	ok: boolean
	url: string
}
