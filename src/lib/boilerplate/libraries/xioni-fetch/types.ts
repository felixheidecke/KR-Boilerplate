export interface XioniFetchClientErrorResponse {
	message: string
	error: string
	statusCode: number
	code?: string
	payload?: { [key: string]: string }
}
