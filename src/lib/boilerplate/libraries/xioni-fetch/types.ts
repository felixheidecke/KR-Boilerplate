import type { FetchResponse } from '../fetch-json/types'

export type XioniFetchErrorResponse = FetchResponse<{
	message: string
	code?: string
	payload?: [string, string][]
}>
