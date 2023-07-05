import XioniFetch from '../xioni-fetch'
import type { XioniShopInfo } from './info.types'
import type { XioniResponse } from '../xioni/types'
import { FetchResponseStatus } from '../fetch-json/types'

export default function MakeShopInfo(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	/**
	 * Get all infos about the including shipping charges
	 *
	 * @returns Informations
	 */

	async function getInfo(): Promise<XioniResponse<XioniShopInfo>> {
		const { status, data } = await xioniFetch(['shop', module, 'info'])

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	return {
		getInfo
	}
}
