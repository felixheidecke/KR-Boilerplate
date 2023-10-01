import { FetchResponseStatus } from '../../fetch-json/types'
import type { XioniResponse } from '../../xioni/types'
import type { XioniShop } from '../types'
import XioniFetch from '../../xioni-fetch'

export function InfoFactory(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	/**
	 * Get all infos about the including shipping charges
	 *
	 * @returns Informations
	 */

	async function getInfo(): Promise<XioniResponse<XioniShop.Info>> {
		const { status, data } = await xioniFetch(['shop', module, 'info'])

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	return { getInfo }
}
