import { FetchResponseStatus } from '../../fetch-json/types'
import type { XioniShop } from '../types'
import type { XioniResponse } from '../../xioni/types'
import XioniFetch from '../../xioni-fetch'

export function CategoriesFactory(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	/**
	 * Get all Categories in the store
	 *
	 * @returns List of Categories
	 */

	async function getCategories(): Promise<XioniResponse<XioniShop.Category[]>> {
		const { status, data } = await xioniFetch(['shop', module, 'categories'])

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	/**
	 * Get a Category
	 *
	 * @param id Category ID
	 * @returns A Category
	 */

	async function getCategory(id: number): Promise<XioniResponse<XioniShop.Category>> {
		const { status, data } = await xioniFetch(['shop', module, 'categories', id])

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	return {
		getCategories,
		getCategory
	}
}
