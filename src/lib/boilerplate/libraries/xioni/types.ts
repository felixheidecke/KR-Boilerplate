import type { XioniFetchClientErrorResponse } from '../xioni-fetch/types'

export type XioniResponse<T> =
	| {
			success: false
			data: XioniFetchClientErrorResponse
	  }
	| {
			success: true
			data: T
	  }
