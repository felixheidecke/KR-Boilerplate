import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'

export function useCart(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart(): Promise<XioniShopData<XioniShop.Cart>> {
		event.emit('loading')
		event.emit('loading-toggle', true)

		const response = await fetch(['shop', module, 'cart'])

		if (response.status === 'success') {
			const cart = response.data as XioniShop.Cart

			event.emit('success', cart)
			event.emit('loading-toggle', false)

			return [cart, undefined]
		} else {
			event.emit('error', response)
			event.emit('loading-toggle', false)

			return [undefined, response as XioniFetchErrorResponse]
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
		event.emit('loading')
		event.emit('loading-toggle', true)

		const response = await fetch(['shop', module, 'cart'], {
			method: 'PUT',
			data: { [id]: quantity }
		})

		if (response.status === 'success') {
			const cart = response.data as XioniShop.Cart

			event.emit('success', cart)
			event.emit('loading-toggle', false)

			return [cart, undefined]
		} else {
			event.emit('error', response)
			event.emit('loading-toggle', false)

			return [undefined, response as XioniFetchErrorResponse]
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
		event.emit('loading')
		event.emit('loading-toggle', true)

		const response = await fetch(['shop', module, 'cart'], {
			method: 'PUT',
			data: { [id]: 1 }
		})

		if (response.status === 'success') {
			const cart = response.data as XioniShop.Cart

			event.emit('success', cart)
			event.emit('loading-toggle', false)

			return [cart, undefined]
		} else {
			event.emit('error', response)
			event.emit('loading-toggle', false)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	return {
		getCart,
		updateItemQuantity,
		addItem,
		$event: event
	}
}
