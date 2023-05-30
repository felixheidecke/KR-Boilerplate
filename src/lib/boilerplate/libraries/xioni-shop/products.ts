import { XIONI_API_URL } from '../../constants'
import fetchJson from '../fetch-json'
import type { ShopProduct, ShopProducts } from './products.types'

export default function ShopProducts(module: number, fetchFn: typeof fetch = fetch) {
	const fetchJSON = fetchJson(fetchFn)
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

		const { ok, data: products } = await fetchJSON([XIONI_API_URL, 'shop', module, 'products'], {
			params
		})

		if (!ok) return

		return products as ShopProduct[]
	}

	/**
	 * Get a single product
	 *
	 * @param id product id
	 * @returns Product
	 */

	async function getProduct(id: number) {
		const { ok, data: product } = await fetchJSON([XIONI_API_URL, 'shop', module, 'product', id])

		if (!ok) return

		return product as ShopProduct
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

		const { ok, data: products } = await fetchJSON(
			[XIONI_API_URL, 'shop', module, 'category', category, 'products'],
			{ params }
		)

		if (!ok) return

		return products as ShopProduct[]
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

		const { ok, data: products } = await fetchJSON([XIONI_API_URL, 'shop', module, 'products'], {
			params
		})

		if (!ok) return

		return products as ShopProduct[]
	}

	return {
		getProduct,
		getProductHighlights,
		getProducts,
		getProductsByCategory
	}
}
