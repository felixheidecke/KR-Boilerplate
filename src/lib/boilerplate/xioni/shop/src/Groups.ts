import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../xioniShop.types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'

export function useGroups(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()
	/**
	 * Get all groups in the store
	 *
	 * @returns List of groups
	 */

	async function getGroups(): Promise<XioniShopData<XioniShop.Group[]>> {
		const context = { emitter: 'getGroups' }
		const response = await fetch(['shop', module, 'groups'])

		if (response.status === 'success') {
			const group = response.data as XioniShop.Group[]

			event.emit('loaded', group, context)
			event.emit('finally', context)

			return [group, undefined]
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

	async function getGroup(id: number): Promise<XioniShopData<XioniShop.Group>> {
		const context = { emitter: 'getGroup' }
		const response = await fetch(['shop', module, 'groups', id])

		if (response.status === 'success') {
			const group = response.data as XioniShop.Group

			event.emit('loaded', group, context)
			event.emit('finally', context)

			return [group, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	async function getGroupByProductId(id: number): Promise<XioniShopData<XioniShop.Group>> {
		const context = { emitter: 'getGroupByProductId' }
		const response = await fetch(['shop', module, 'products', id, 'group'])

		if (response.status === 'success') {
			const group = response.data as XioniShop.Group

			event.emit('loaded', group, context)
			event.emit('finally', context)

			return [group, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	return {
		getGroupByProductId,
		getGroups,
		getGroup
	}
}
