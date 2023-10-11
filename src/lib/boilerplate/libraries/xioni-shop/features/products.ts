import { FetchResponseStatus } from '../../fetch-json/types'
import XioniFetch from '../../xioni-fetch'
import type { XioniFetchClientErrorResponse } from '../../xioni-fetch/types'
import type { XioniResponse } from '../../xioni/types'
import type { XioniShop } from '../types'

type PartsProp = Array<'text' | 'pdf' | 'quantity' | 'weight'>
type LimitProp = number
type HighlightsProp = boolean

export function ProductsFactory(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	/**
	 * Get all products
	 *
	 * @param limit Max amount of products returned
	 * @returns List of Products
	 */

	async function getProducts({
		limit,
		parts
	}: {
		limit?: LimitProp
		parts?: PartsProp
	}): Promise<XioniResponse<XioniShop.Product[]>> {
		const { status, data } = await xioniFetch(['shop', module, 'products'], {
			params: { limit, parts }
		})

		return status === FetchResponseStatus.SUCCESS
			? [data as XioniShop.Product[], undefined]
			: [undefined, data as XioniFetchClientErrorResponse]
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
			: [undefined, data as XioniFetchClientErrorResponse]
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
		config: { limit?: LimitProp; parts?: PartsProp } = {}
	): Promise<XioniResponse<XioniShop.Product[]>> {
		const { status, data } = await xioniFetch(
			['shop', module, 'categories', category, 'products'],
			{ params: { config } }
		)

		return status === FetchResponseStatus.SUCCESS
			? [data as XioniShop.Product[], undefined]
			: [undefined, data as XioniFetchClientErrorResponse]
	}

	/**
	 * Get all frontpage products
	 *
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProductHighlights(
		config: { limit?: LimitProp; parts?: PartsProp } = {}
	): Promise<XioniResponse<XioniShop.Product[]>> {
		const params = {
			...config,
			highlight: true as HighlightsProp
		}

		const { status, data } = await xioniFetch(['shop', module, 'products'], { params })

		return status === FetchResponseStatus.SUCCESS
			? [data as XioniShop.Product[], undefined]
			: [undefined, data as XioniFetchClientErrorResponse]
	}

	return {
		getProduct,
		getProductHighlights,
		getProducts,
		getProductsByCategory
	}
}
