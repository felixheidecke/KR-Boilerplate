import XioniFetch from '../xioni-fetch'
import type { XioniResponse } from '../xioni/types'
import type { ShopCategory } from './categories.types'
import { FetchResponseStatus } from '../fetch-json/types'

export default function MakeShopCategories(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	/**
	 * Get all Categories in the store
	 *
	 * @returns List of Categories
	 */

	async function getCategories(): Promise<XioniResponse<ShopCategory[]>> {
		const { status, data } = await xioniFetch(['shop', module, 'categories'])

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	/**
	 * Get a Category
	 *
	 * @param id Category ID
	 * @returns A Category
	 */

	async function getCategory(id: number): Promise<XioniResponse<ShopCategory>> {
		const { status, data } = await xioniFetch(['shop', module, 'categories', id])

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	return {
		getCategories,
		getCategory
	}
}
