import type { FetchResponse } from '../fetch-json/types'

export interface XioniFetchResponse extends FetchResponse {
	data: object | object[] | null
}
