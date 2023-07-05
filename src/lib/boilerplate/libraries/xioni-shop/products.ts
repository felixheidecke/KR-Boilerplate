import XioniFetch from '../xioni-fetch'
import type { XioniResponse } from '../xioni/types'
import type { ShopProduct } from './products.types'
import fetchJson from '../fetch-json'
import { XIONI_API_URL } from '../../constants'
import { FetchResponseStatus } from '../fetch-json/types'

export default function MakeShopProducts(module: number, fetchFn: typeof fetch = fetch) {
	const fetchJSON = fetchJson(fetchFn)
	const xioniFetch = XioniFetch(fetchFn)
	/**
	 * Get all products
	 *
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProducts(limit?: number): Promise<XioniResponse<ShopProduct[]>> {
		const params = {}

		if (limit && limit > 0) {
			Object.assign(params, { limit })
		}

		const { status, data } = await xioniFetch(['shop', module, 'products'], { params })

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	/**
	 * Get a single product
	 *
	 * @param id product id
	 * @returns Product
	 */

	async function getProduct(id: number): Promise<XioniResponse<ShopProduct>> {
		const { status, data } = await xioniFetch(['shop', module, 'products', id])

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
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
		filter: { limit?: number } = {}
	): Promise<XioniResponse<ShopProduct[]>> {
		const params = {}

		if (filter.limit && filter.limit > 0) {
			Object.assign(params, { limit: filter.limit })
		}

		const { status, data } = await fetchJSON(
			[XIONI_API_URL, 'shop', module, 'categories', category, 'products'],
			{ params }
		)

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	/**
	 * Get all frontpage products
	 *
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProductHighlights(
		filter: { limit?: number } = {}
	): Promise<XioniResponse<ShopProduct[]>> {
		const params = {
			filter: 'highlight'
		}

		if (filter.limit && filter.limit > 0) {
			Object.assign(params, { limit: filter.limit })
		}

		const { status, data } = await fetchJSON([XIONI_API_URL, 'shop', module, 'products'], {
			params
		})

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	return {
		getProduct,
		getProductHighlights,
		getProducts,
		getProductsByCategory
	}
}
