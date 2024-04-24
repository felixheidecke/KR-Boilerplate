import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import type { Xioni } from '../../xioni.types'

export function useCategories(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()
	/**
	 * Get all Categories in the store
	 *
	 * @returns List of Categories
	 */

	async function getCategories(config?: {
		detailLevel?: Xioni.DetailLevel.Basic | Xioni.DetailLevel.Extended
	}): Promise<XioniShopData<XioniShop.Category[]>> {
		const context = { emitter: 'getCategories' }
		const params = {}

		if (config?.detailLevel) {
			Object.assign(params, { detailLevel: config.detailLevel })
		}

		const response = await fetch(['shop', module, 'categories'], { params })

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

	async function getCategory(
		id: number,
		config?: {
			detailLevel?: Xioni.DetailLevel.Minimal | Xioni.DetailLevel.Basic | Xioni.DetailLevel.Extended
		}
	): Promise<XioniShopData<XioniShop.Category>> {
		const context = { emitter: 'getCategory' }
		const params = {}

		if (config?.detailLevel) {
			Object.assign(params, { detailLevel: config.detailLevel })
		}

		const response = await fetch(['shop', module, 'categories', id], { params })

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
