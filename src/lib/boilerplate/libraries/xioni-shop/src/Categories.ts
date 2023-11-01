import { FetchResponseStatus } from '../../../utils/fetch-json/types'
import { XioniFetch } from '../../xioni-fetch'
import EventEmitter from 'eventemitter3'

import type { XioniFetchErrorResponse } from '../../xioni-fetch/types'
import type { XioniResponse } from '../../xioni-cms/types'
import type { XioniShop } from '../types'

export function CategoriesFactory(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	const event = new EventEmitter()
	/**
	 * Get all Categories in the store
	 *
	 * @returns List of Categories
	 */

	async function getCategories(): Promise<XioniResponse<XioniShop.Category[]>> {
		const context = { emitter: 'getCategories' }

		event.emit('loading', context)

		const response = await xioniFetch(['shop', module, 'categories'])

		if (response.status === FetchResponseStatus.SUCCESS) {
			const category = response.data as XioniShop.Category[]

			event.emit('loaded', category, context)
			event.emit('finally', context)

			return [category, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	/**
	 * Get a Category
	 *
	 * @param id Category ID
	 * @returns A Category
	 */

	async function getCategory(id: number): Promise<XioniResponse<XioniShop.Category>> {
		const context = { emitter: 'getCategory' }

		event.emit('loading', context)

		const response = await xioniFetch(['shop', module, 'categories', id])

		if (response.status === FetchResponseStatus.SUCCESS) {
			const category = response.data as XioniShop.Category

			event.emit('loaded', category, context)
			event.emit('finally', context)

			return [category, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	return {
		getCategories,
		getCategory
	}
}
