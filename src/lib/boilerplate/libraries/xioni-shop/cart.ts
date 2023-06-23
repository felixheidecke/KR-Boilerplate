import { FetchMethods } from '../fetch-json/types'
import XioniFetch from '../xioni-fetch'

import type { ShopCart, ShopCartProduct } from './cart.types'

// --- Factory -------------------------------------------------------------------------------------

export default (module: number, fetchFn: typeof fetch = fetch) => {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart() {
		const { ok, data: cart } = await xioniFetch(['shop', module, 'cart'], {
			method: FetchMethods.POST,
			data: {}
		})

		if (!ok) return

		return cart as ShopCartProduct
	}

	/**
	 * Set the amount of a given product in cart
	 * setting "0" removes it from the cart
	 *
	 * @param id Product ID
	 * @param quantity amount
	 * @returns Cart
	 */

	async function updateQuantity(id: number, quantity: number) {
		const { ok, data: cart } = await xioniFetch(['shop', module, 'cart/update'], {
			method: FetchMethods.PATCH,
			data: { quantity, id }
		})

		if (!ok) return

		return cart as ShopCart
	}

	/**
	 * Add given product to the cart.
	 * Will incement the current amount by 1
	 *
	 * @param id Product ID
	 * @returns Cart
	 */

	async function addItem(id: number) {
		const { ok, data: cart } = await xioniFetch(['shop', module, 'cart/add'], {
			method: FetchMethods.PATCH,
			params: { id }
		})

		if (!ok) return

		return cart as ShopCart
	}

	return {
		getCart,
		updateQuantity,
		addItem
	}
}
