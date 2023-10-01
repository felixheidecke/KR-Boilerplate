import { xioniFetch, type XioniFetchErrorResponse } from '../utils/xioniFetch'

import type { XioniShop } from '../types'

export function useInfo(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)

	/**
	 * Get all infos about the including shipping charges
	 *
	 * @returns Informations
	 */

	async function getInfo(): Promise<XioniShop.Info> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'info'])

			if (response.status === 'success') {
				resolve(response.data as XioniShop.Info)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	return {
		getInfo
	}
}
