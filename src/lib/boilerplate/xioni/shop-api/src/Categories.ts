import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'

export function CategoriesFactory(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()
	/**
	 * Get all Categories in the store
	 *
	 * @returns List of Categories
	 */

	async function getCategories(): Promise<XioniShopData<XioniShop.Category[]>> {
		const context = { emitter: 'getCategories' }

		event.emit('loading', context)

		const response = await fetch(['shop', module, 'categories'])

		if (response.status === 'success') {
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

	async function getCategory(id: number): Promise<XioniShopData<XioniShop.Category>> {
		const context = { emitter: 'getCategory' }

		event.emit('loading', context)

		const response = await fetch(['shop', module, 'categories', id])

		if (response.status === 'success') {
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
