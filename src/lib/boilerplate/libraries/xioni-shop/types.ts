import type { XioniFetchClientErrorResponse } from '../xioni-fetch/types'

export interface ErrorResponse {
	success: false
	data: XioniFetchClientErrorResponse
}
