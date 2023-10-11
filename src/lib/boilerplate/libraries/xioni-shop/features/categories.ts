import { FetchResponseStatus } from '../../fetch-json/types'
import type { XioniShop } from '../types'
import type { XioniResponse } from '../../xioni/types'
import XioniFetch from '../../xioni-fetch'
import type { XioniFetchErrorResponse } from '../../xioni-fetch/types'

export function CategoriesFactory(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	/**
	 * Get all Categories in the store
	 *
	 * @returns List of Categories
	 */

	async function getCategories(): Promise<XioniResponse<XioniShop.Category[]>> {
		const response = await xioniFetch(['shop', module, 'categories'])

		return response.status === FetchResponseStatus.SUCCESS
			? [response.data as XioniShop.Category[], undefined]
			: [undefined, response as XioniFetchErrorResponse]
	}

	/**
	 * Get a Category
	 *
	 * @param id Category ID
	 * @returns A Category
	 */

	async function getCategory(id: number): Promise<XioniResponse<XioniShop.Category>> {
		const response = await xioniFetch(['shop', module, 'categories', id])

		return response.status === FetchResponseStatus.SUCCESS
			? [response.data as XioniShop.Category, undefined]
			: [undefined, response as XioniFetchErrorResponse]
	}

	return {
		getCategories,
		getCategory
	}
}
