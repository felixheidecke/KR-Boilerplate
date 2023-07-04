import { FetchResponseStatus } from '../fetch-json/types'

export function isClientError(status: FetchResponseStatus) {
	return status === FetchResponseStatus.CLIENT_ERROR
}
