import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import { writable } from 'svelte/store'

export function useCart(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart(): Promise<XioniShopData<XioniShop.Cart>> {
		const context = { emitter: 'getCart' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'cart'])

		if (response.status === 'success') {
			const cart = response.data as XioniShop.Cart

			event.emit('success', cart, context)
			event.emit('loading-toggle', false, context)

			return [cart, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

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
		const context = { emitter: 'updateItemQuantity' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'cart'], {
			method: 'PUT',
			data: [
				{
					productId: id,
					quantity
				}
			]
		})

		if (response.status === 'success') {
			const cart = response.data as XioniShop.Cart

			event.emit('success', cart, context)
			event.emit('loading-toggle', false, context)

			return [cart, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

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
		const context = { emitter: 'addItem' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'cart'], {
			method: 'PUT',
			data: [
				{
					productId: id,
					quantity: 1
				}
			]
		})

		if (response.status === 'success') {
			const cart = response.data as XioniShop.Cart

			event.emit('success', cart, context)
			event.emit('loading-toggle', false, context)

			return [cart, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

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

export function useCartStore(cart: ReturnType<typeof useCart>) {
	const { subscribe, set, update } = writable(
		{
			data: {} as XioniShop.Cart,
			isLoading: false,
			errors: null as XioniFetchErrorResponse | null
		},
		() => {
			cart.$event.on('success', data => {
				set({ data, isLoading: false, errors: null })
			})

			cart.$event.on('error', errors => {
				update(({ data }) => ({ data, isLoading: false, errors }))
			})

			cart.$event.on('loading-toggle', isLoading => {
				// isLoading = false will be set by success and error handlers
				if (!isLoading) return

				update(({ data, errors }) => ({ data, isLoading, errors }))
			})

			return function () {
				cart.$event.removeAllListeners()
			}
		}
	)

	return {
		subscribe,
		get: cart.getCart,
		addItem: cart.addItem,
		updateItemQuantity: cart.updateItemQuantity
	}
}
