import appConfig from '$lib/app.config'
import Axios, { type CreateAxiosDefaults } from 'axios'
import type { XioniShop } from '../types'

export function useProducts(config?: CreateAxiosDefaults) {
	const { shopApiKey, shopApiBaseUrl } = appConfig

	const axios = Axios.create({
		baseURL: shopApiBaseUrl,
		...config,
		headers: {
			'api-key': shopApiKey,
			...config?.headers
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
			const { data } = await axios.get<XioniShop.Product[]>('/products', {
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
			const { data } = await axios.get<XioniShop.Product>(`/products/${id}`)

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
			const { data } = await axios.get<XioniShop.Product[]>(`/groups/${category}/products`, {
				params
			})

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
