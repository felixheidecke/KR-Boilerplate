import { API_BASE_URL } from '../constants'
import Axios from 'axios'
import config from '$lib/app.config'
import type { XioniShop } from '../types'

export function useProducts(module: number, fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: new URL('v5', API_BASE_URL).toString(),
		headers: {
			'api-key': config.krApiKey
		}
	})

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
			const { data } = await axios.get<XioniShop.Product[]>(`/shop/${module}/products`, {
				params
			})

			return data
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
			const { data } = await axios.get<XioniShop.Product>(`shop/${module}/products/${id}`)

			return data
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
			const { data } = await axios.get<XioniShop.Product[]>(
				`shop/${module}/groups/${category}/products`,
				{ params }
			)

			return data
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
