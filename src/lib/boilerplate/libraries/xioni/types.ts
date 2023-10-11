import type { XioniFetchErrorResponse } from '../xioni-fetch/types'

export type XioniResponse<T = unknown> = [T, undefined] | [undefined, XioniFetchErrorResponse]
