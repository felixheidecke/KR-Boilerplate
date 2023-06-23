import { FetchMethods } from '../fetch-json/types'
import { XIONI_API_URL } from '../../constants'
import XioniFetch from '../xioni-fetch'

import type { ShopCart } from './cart.types'
import type { ShopRecieptOrder } from './order.types'

// --- Factory -------------------------------------------------------------------------------------

export default function MakeShopOrder(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getReciept(transactionId: string) {
		const { ok, data: cart } = await xioniFetch(['shop', module, 'order', transactionId], {
			method: FetchMethods.GET
		})

		if (!ok) return

		return {
			...cart,
			date: new Date(cart.date)
		} as ShopRecieptOrder
	}

	/**
	 * Set the amount of a given product in cart
	 * setting "0" removes it from the cart
	 *
	 * @param quantity amount
	 * @param id Product ID
	 * @returns Cart
	 */

	async function updateQuantity(quantity: number, id: number) {
		const { ok, data: cart } = await xioniFetch([XIONI_API_URL, 'shop', module, 'cart/update'], {
			method: FetchMethods.UPDATE,
			params: { quantity, id }
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
		const { ok, data: cart } = await xioniFetch([XIONI_API_URL, 'shop', module, 'cart/add'], {
			method: FetchMethods.PATCH,
			params: { id }
		})

		if (!ok) return

		return cart as ShopCart
	}

	return {
		getReciept,
		updateQuantity,
		addItem
	}
}
