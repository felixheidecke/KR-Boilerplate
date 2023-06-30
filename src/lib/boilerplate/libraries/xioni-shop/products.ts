import { XIONI_API_URL } from '../../constants'
import fetchJson from '../fetch-json'
import XioniFetch from '../xioni-fetch'
import type { ShopProduct } from './products.types'

export default function MakeShopProducts(module: number, fetchFn: typeof fetch = fetch) {
	const fetchJSON = fetchJson(fetchFn)
	const xioniFetch = XioniFetch(fetchFn)
	/**
	 * Get all products
	 *
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProducts(limit?: number) {
		const params = {}

		if (limit && limit > 0) {
			Object.assign(params, { limit })
		}

		const path = ['shop', module, 'products']
		const { ok, data } = await xioniFetch(path, { params })

		if (!ok || !data) {
			throw new Error('Faild loading ' + path)
		}

		return data as ShopProduct[]
	}

	/**
	 * Get a single product
	 *
	 * @param id product id
	 * @returns Product
	 */

	async function getProduct(id: number) {
		const path = ['shop', module, 'products', id]
		const { ok, data } = await xioniFetch(path)

		if (!ok || !data) {
			throw new Error('Faild loading ' + path)
		}

		return data as ShopProduct
	}

	/**
	 * Get produtcs corresponding to a given Category
	 *
	 * @param category Category id
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProductsByCategory(category: number, filter: { limit?: number } = {}) {
		const params = {}

		if (filter.limit && filter.limit > 0) {
			Object.assign(params, { limit: filter.limit })
		}

		const path = [XIONI_API_URL, 'shop', module, 'categories', category, 'products']
		const { ok, data } = await fetchJSON(path, { params })

		if (!ok || !data) {
			throw new Error('Faild loading ' + path)
		}

		return data as ShopProduct[]
	}

	/**
	 * Get all frontpage products
	 *
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProductHighlights(filter: { limit?: number } = {}) {
		const params = {
			filter: 'highlight'
		}

		if (filter.limit && filter.limit > 0) {
			Object.assign(params, { limit: filter.limit })
		}

		const path = [XIONI_API_URL, 'shop', module, 'products']
		const { ok, data } = await fetchJSON(path, { params })

		if (!ok || !data) {
			throw new Error('Faild loading ' + path)
		}

		return data as ShopProduct[]
	}

	return {
		getProduct,
		getProductHighlights,
		getProducts,
		getProductsByCategory
	}
}
