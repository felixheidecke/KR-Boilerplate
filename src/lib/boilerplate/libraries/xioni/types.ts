import type { XioniFetchClientErrorResponse } from '../xioni-fetch/types'

export type XioniResponse<T> = [XioniFetchClientErrorResponse, undefined] | [undefined, T]
