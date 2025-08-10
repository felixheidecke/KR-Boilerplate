import type { XioniShop } from '../types'
import { createClient, createShopUrl } from '../api/client'
import type { KyResponse } from 'ky'

export function useGroups() {
	const client = createClient()

	async function getGroups(): Promise<XioniShop.Group[]> {
		try {
			return await client.get(createShopUrl('groups')).json()
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
		}
	}

	async function getGroup(id: number): Promise<XioniShop.Group> {
		try {
			return await client.get(createShopUrl(`groups/${id}`)).json()
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
		}
	}

	async function getGroupByProductId(id: number): Promise<XioniShop.Group> {
		try {
			return await client.get(createShopUrl(`products/${id}/group`)).json()
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
		}
	}

	return {
		getGroupByProductId,
		getGroups,
		getGroup
	}
}
