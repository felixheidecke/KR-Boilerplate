import XioniFetch from '../xioni-fetch'
import type { ShopCategory } from './categories.types'

export default function MakeShopCategories(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	/**
	 * Get all Categories in the store
	 *
	 * @returns List of Categories
	 */

	async function getCategories() {
		const { data } = await xioniFetch(['shop', module, 'categories'])

		return data as ShopCategory[]
	}

	/**
	 * Get a Category
	 *
	 * @param id Category ID
	 * @returns A Category
	 */

	async function getCategory(id: number) {
		const { data } = await xioniFetch(['shop', module, 'categories', id])

		return data as ShopCategory
	}

	return {
		getCategories,
		getCategory
	}
}
