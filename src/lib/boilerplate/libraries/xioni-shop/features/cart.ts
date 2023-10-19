import { FetchMethods, FetchResponseStatus } from '../../fetch-json/types'
import XioniFetch from '../../xioni-fetch'
import EventEmitter from 'eventemitter3'

import type { XioniFetchErrorResponse } from '../../xioni-fetch/types'
import type { XioniResponse } from '../../xioni/types'
import type { XioniShop } from '../types'

export function CartFactory(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart(): Promise<XioniResponse<XioniShop.Cart>> {
		const response = await xioniFetch(['shop', module, 'cart'])

		if (response.status === FetchResponseStatus.SUCCESS) {
			const cart = response.data as XioniShop.Cart

			event.emit('loaded', cart)
			return [cart, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error)
			return [undefined, error]
		}
	}

	/**
	 * Set the amount of a given product in cart
	 * setting "0" removes it from the cart
	 *
	 * @param id Product ID
	 * @param quantity amount
	 * @returns Cart
	 */

	async function updateItemQuantity(
		id: number,
		quantity: number
	): Promise<XioniResponse<XioniShop.Cart>> {
		const response = await xioniFetch(['shop', module, 'cart'], {
			method: FetchMethods.PUT,
			data: { [id]: quantity }
		})

		if (response.status === FetchResponseStatus.SUCCESS) {
			const cart = response.data as XioniShop.Cart

			event.emit('updated', cart)
			return [cart, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error)
			return [undefined, error]
		}
	}

	/**
	 * Add given product to the cart.
	 * Will incement the current amount by 1
	 *
	 * @param id Product ID
	 * @returns Cart
	 */

	async function addItem(id: number): Promise<XioniResponse<XioniShop.Cart>> {
		const response = await xioniFetch(['shop', module, 'cart'], {
			method: FetchMethods.PUT,
			data: { [id]: 1 }
		})

		if (response.status === FetchResponseStatus.SUCCESS) {
			const cart = response.data as XioniShop.Cart

			event.emit('updated', cart)
			return [cart, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error)
			return [undefined, error]
		}
	}

	return {
		getCart,
		updateItemQuantity,
		addItem,
		$event: event
	}
}
