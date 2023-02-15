import { XIONI_API_URL } from '../../constants'
import fetchJson from '../fetch-json'
import type { XioniShopCategories, XioniShopCategory } from './categories.types'

export default (module: number, fetchFn: typeof fetch = fetch) => {
	const fetchJSON = fetchJson(fetchFn)
	/**
	 * Get all Categories in the store
	 *
	 * @returns List of Categories
	 */

	async function getAll() {
		const { ok, data: categories } = await fetchJSON([XIONI_API_URL, 'shop', module, 'categories'])

		if (!ok) return

		return categories as XioniShopCategories
	}

	/**
	 * Get a Category
	 *
	 * @param id Category ID
	 * @returns A Category
	 */

	async function getOne(id: number | string) {
		const { ok, data: category } = await fetchJSON([XIONI_API_URL, 'shop', module, 'category', id])

		if (!ok) return

		return category as XioniShopCategory
	}

	return {
		getAll,
		getOne
	}
}
