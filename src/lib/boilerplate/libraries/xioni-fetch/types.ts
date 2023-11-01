import type { FetchResponse } from '../../utils/fetch-json/types'

export type XioniFetchErrorResponse = FetchResponse<{
	message: string
	code?: string
	payload?: [string, string][]
}>
