import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'

export function useProducts(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	/**
	 * Get all products
	 *
	 * @param limit Max amount of products returned
	 * @returns List of Products
	 */

	async function getProducts({
		limit
	}: {
		limit?: number
	}): Promise<XioniShopData<XioniShop.Product[]>> {
		const { status, data } = await fetch(['shop', module, 'products'], {
			params: { limit }
		})

		return status === 'success'
			? [data as XioniShop.Product[], undefined]
			: [undefined, data as XioniFetchErrorResponse]
	}

	/**
	 * Get a single product
	 *
	 * @param id product id
	 * @returns Product
	 */

	async function getProduct(id: number): Promise<XioniShopData<XioniShop.Product>> {
		const { status, data } = await fetch(['shop', module, 'products', id])

		return status === 'success'
			? [data as XioniShop.Product, undefined]
			: [undefined, data as XioniFetchErrorResponse]
	}

	/**
	 * Get produtcs corresponding to a given Category
	 *
	 * @param category Category id
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProductsByCategory(
		category: number,
		config: { limit?: number } = {}
	): Promise<XioniShopData<XioniShop.Product[]>> {
		const { status, data } = await fetch(['shop', module, 'categories', category, 'products'], {
			params: config
		})

		return status === 'success'
			? [data as XioniShop.Product[], undefined]
			: [undefined, data as XioniFetchErrorResponse]
	}

	/**
	 * Get all frontpage products
	 *
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProductHighlights(
		config: { limit?: number } = {}
	): Promise<XioniShopData<XioniShop.Product[]>> {
		const params = {
			...config,
			highlight: true
		}

		const { status, data } = await fetch(['shop', module, 'products'], { params })

		return status === 'success'
			? [data as XioniShop.Product[], undefined]
			: [undefined, data as XioniFetchErrorResponse]
	}

	return {
		getProduct,
		getProductHighlights,
		getProducts,
		getProductsByCategory
	}
}
