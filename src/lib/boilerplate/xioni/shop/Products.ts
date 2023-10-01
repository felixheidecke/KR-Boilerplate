import { xioniFetch, type XioniFetchErrorResponse } from '../utils/xioniFetch'

import type { XioniShop } from '../types'

export function useProducts(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	/**
	 * Get all products
	 *
	 * @param limit Max amount of products returned
	 * @returns List of Products
	 */

	async function getProducts(params?: {
		limit?: number
		frontpage?: boolean
	}): Promise<XioniShop.Product[]> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'products'], { params })

			if (response.status === 'success') {
				resolve(response.data as XioniShop.Product[])
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	/**
	 * Get a single product
	 *
	 * @param id product id
	 * @returns Product
	 */

	async function getProduct(id: number): Promise<XioniShop.Product> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'products', id])

			if (response.status === 'success') {
				resolve(response.data as XioniShop.Product)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	/**
	 * Get produtcs corresponding to a given Category
	 *
	 * @param category Category id
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProductsByGroup(
		category: number,
		params?: {
			limit?: number
			recursive?: boolean
		}
	): Promise<XioniShop.Product[]> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'groups', category, 'products'], { params })

			if (response.status === 'success') {
				resolve(response.data as XioniShop.Product[])
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	return {
		getProduct,
		getProducts,
		getProductsByGroup
	}
}
