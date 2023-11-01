import { FetchResponseStatus } from '../../../utils/fetch-json/types'
import { XioniFetch } from '../../xioni-fetch'

import type { XioniFetchErrorResponse } from '../../xioni-fetch/types'
import type { XioniResponse } from '../../xioni-cms/types'
import type { XioniShop } from '../types'

export function ProductsFactory(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
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
	}): Promise<XioniResponse<XioniShop.Product[]>> {
		const { status, data } = await xioniFetch(['shop', module, 'products'], {
			params: { limit }
		})

		return status === FetchResponseStatus.SUCCESS
			? [data as XioniShop.Product[], undefined]
			: [undefined, data as XioniFetchErrorResponse]
	}

	/**
	 * Get a single product
	 *
	 * @param id product id
	 * @returns Product
	 */

	async function getProduct(id: number): Promise<XioniResponse<XioniShop.Product>> {
		const { status, data } = await xioniFetch(['shop', module, 'products', id])

		return status === FetchResponseStatus.SUCCESS
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
	): Promise<XioniResponse<XioniShop.Product[]>> {
		const { status, data } = await xioniFetch(
			['shop', module, 'categories', category, 'products'],
			{ params: { config } }
		)

		return status === FetchResponseStatus.SUCCESS
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
	): Promise<XioniResponse<XioniShop.Product[]>> {
		const params = {
			...config,
			highlight: true
		}

		const { status, data } = await xioniFetch(['shop', module, 'products'], { params })

		return status === FetchResponseStatus.SUCCESS
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
