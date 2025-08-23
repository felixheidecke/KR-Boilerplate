import { createClient, createShopUrl } from '../api/client'
import type { XioniShop } from '../types'
import type { KyResponse } from 'ky'

export function useInfo() {
	const client = createClient()

	/**
	 * Get shop infos
	 *
	 * @returns Info about owner and shipping costs
	 */

	async function getInfos(): Promise<XioniShop.Info> {
		try {
			const url = createShopUrl('info')

			return client.get<XioniShop.Info>(url).json()
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
		}
	}

	return {
		getInfos
	}
}
