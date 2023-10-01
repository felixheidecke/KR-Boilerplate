import { xioniFetch, type XioniFetchErrorResponse } from '../utils/xioniFetch'

import type { XioniShop } from '../types'

export function useGroups(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	/**
	 * Get all groups in the store
	 *
	 * @returns List of groups
	 */

	async function getGroups(): Promise<XioniShop.Group[]> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'groups'])

			if (response.status === 'success') {
				resolve(response.data as XioniShop.Group[])
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	/**
	 * Get a Category
	 *
	 * @param id Category ID
	 * @returns A Category
	 */

	async function getGroup(id: number): Promise<XioniShop.Group> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'groups', id])

			if (response.status === 'success') {
				resolve(response.data as XioniShop.Group)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	async function getGroupByProductId(id: number): Promise<XioniShop.Group> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'products', id, 'group'])

			if (response.status === 'success') {
				resolve(response.data as XioniShop.Group)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	return {
		getGroupByProductId,
		getGroups,
		getGroup
	}
}
