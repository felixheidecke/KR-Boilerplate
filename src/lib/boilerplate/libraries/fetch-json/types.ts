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
	data: any
	status: FetchResponseStatus
	statusCode: number
	url: string
}

export enum FetchResponseStatus {
	INFORMAL = 'informal',
	SUCCESS = 'success',
	REDIRECT = 'redirect',
	CLIENT_ERROR = 'client-error',
	SERVER_ERROR = 'server-error'
}
