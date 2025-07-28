import type { XioniShop } from '../types'
import { createClient, createUrl } from '../api/client'

export function useProducts() {
	const client = createClient()

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
		try {
			const url = createUrl('products', {
				query: {
					limit: params?.limit,
					frontpage: params?.frontpage
				}
			})

			return client.get<XioniShop.Product[]>(url).json()
		} catch (error) {
			throw error
		}
	}

	/**
	 * Get a single product
	 *
	 * @param id product id
	 * @returns Product
	 */

	async function getProduct(id: number): Promise<XioniShop.Product> {
		try {
			return client.get<XioniShop.Product>(`products/${id}`).json()
		} catch (error) {
			throw error
		}
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
		try {
			const url = createUrl(`groups/${category}/products`, {
				query: {
					limit: params?.limit,
					recursive: params?.recursive
				}
			})

			return client.get<XioniShop.Product[]>(url).json()
		} catch (error) {
			throw error
		}
	}

	return {
		getProduct,
		getProducts,
		getProductsByGroup
	}
}
