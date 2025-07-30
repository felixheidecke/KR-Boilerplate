import type { XioniShop } from '../types'
import { createClient, createShopUrl } from '../api/client'

export function useGroups() {
	const client = createClient()

	async function getGroups(): Promise<XioniShop.Group[]> {
		try {
			return await client.get(createShopUrl('groups')).json()
		} catch (error) {
			throw error
		}
	}

	async function getGroup(id: number): Promise<XioniShop.Group> {
		try {
			return await client.get(createShopUrl(`groups/${id}`)).json()
		} catch (error) {
			throw error
		}
	}

	async function getGroupByProductId(id: number): Promise<XioniShop.Group> {
		try {
			return await client.get(createShopUrl(`products/${id}/group`)).json()
		} catch (error) {
			throw error
		}
	}

	return {
		getGroupByProductId,
		getGroups,
		getGroup
	}
}
