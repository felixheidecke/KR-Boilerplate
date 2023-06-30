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
		const path = ['shop', module, 'categories']
		const { ok, data } = await xioniFetch(path)

		if (!ok) {
			throw new Error('Faild loading ' + path)
		}

		return data as ShopCategory[]
	}

	/**
	 * Get a Category
	 *
	 * @param id Category ID
	 * @returns A Category
	 */

	async function getCategory(id: number) {
		const path = ['shop', module, 'categories', id]
		const { ok, data } = await xioniFetch(path)

		if (!ok) {
			throw new Error('Faild loading ' + path)
		}

		return data as ShopCategory
	}

	return {
		getCategories,
		getCategory
	}
}
