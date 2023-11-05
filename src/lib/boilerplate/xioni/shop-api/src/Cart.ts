import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'

export function CartFactory(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart(): Promise<XioniShopData<XioniShop.Cart>> {
		const context = { emitter: 'getCart' }

		event.emit('loading', context)

		const response = await fetch(['shop', module, 'cart'])

		if (response.status === 'success') {
			const cart = response.data as XioniShop.Cart

			event.emit('loaded', cart, context)
			event.emit('finally', context)

			return [cart, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

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
	): Promise<XioniShopData<XioniShop.Cart>> {
		const context = { emitter: 'updateItemQuantity' }

		event.emit('updating', context)

		const response = await fetch(['shop', module, 'cart'], {
			method: 'PUT',
			data: { [id]: quantity }
		})

		if (response.status === 'success') {
			const cart = response.data as XioniShop.Cart

			event.emit('updated', cart, context)
			event.emit('finally', context)

			return [cart, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

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

	async function addItem(id: number): Promise<XioniShopData<XioniShop.Cart>> {
		const context = { emitter: 'addItem' }

		event.emit('updating', context)

		const response = await fetch(['shop', module, 'cart'], {
			method: 'PUT',
			data: { [id]: 1 }
		})

		if (response.status === 'success') {
			const cart = response.data as XioniShop.Cart

			event.emit('updated', cart, context)
			event.emit('finally', context)

			return [cart, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

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
