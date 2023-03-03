import { XIONI_API_URL } from '../../constants'
import fetchJson from '../fetch-json'
import type { XioniShopProduct, XioniShopProducts } from './products.types'

export default (module: number, fetchFn: typeof fetch = fetch) => {
	const fetchJSON = fetchJson(fetchFn)
	/**
	 * Get all products
	 *
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getMany(limit?: number) {
		const params = {}

		if (limit && limit > 0) {
			Object.assign(params, { limit })
		}

		const { ok, data: products } = await fetchJSON([XIONI_API_URL, 'shop', module, 'products'], {
			params
		})

		if (!ok) return

		return products as XioniShopProducts
	}

	/**
	 * Get a single product
	 *
	 * @param id product id
	 * @returns Product
	 */

	async function getOne(id: number) {
		const { ok, data: products } = await fetchJSON([XIONI_API_URL, 'shop', module, 'product', id])

		if (!ok) return

		return products as XioniShopProduct
	}

	/**
	 * Get produtcs corresponding to a given Category
	 *
	 * @param category Category id
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getByCategory(category: number, filter: { limit?: number } = {}) {
		const params = {}

		if (filter.limit && filter.limit > 0) {
			Object.assign(params, { limit: filter.limit })
		}

		const { ok, data: products } = await fetchJSON(
			[XIONI_API_URL, 'shop', module, 'category', category, 'products'],
			{ params }
		)

		if (!ok) return

		return products as XioniShopProducts
	}

	/**
	 * Get all frontpage products
	 *
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getFromFrontpage(filter: { limit?: number } = {}) {
		const params = {
			filter: 'frontpage'
		}

		if (filter.limit && filter.limit > 0) {
			Object.assign(params, { limit: filter.limit })
		}

		const { ok, data: products } = await fetchJSON([XIONI_API_URL, 'shop', module, 'products'], {
			params
		})

		if (!ok) return

		return products as XioniShopProducts
	}

	return {
		getMany,
		getOne,
		getByCategory,
		getFromFrontpage
	}
}
