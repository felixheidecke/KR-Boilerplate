import type { XioniShop } from '../types'
import { createClient } from '../api/client'

export function useGroups() {
	const client = createClient()

	async function getGroups(): Promise<XioniShop.Group[]> {
		try {
			return await client.get('groups').json()
		} catch (error) {
			throw error
		}
	}

	async function getGroup(id: number): Promise<XioniShop.Group> {
		try {
			return await client.get(`groups/${id}`).json()
		} catch (error) {
			throw error
		}
	}

	async function getGroupByProductId(id: number): Promise<XioniShop.Group> {
		try {
			return await client.get(`products/${id}/group`).json()
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
