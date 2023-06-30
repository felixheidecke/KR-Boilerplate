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

	// async function getReciept(transactionId: string) {
	// 	const { ok, data } = await xioniFetch(['shop', module, 'order', transactionId], {
	// 		method: FetchMethods.GET
	// 	})

	// 	if (!ok || !data) {
	// 		throw new Error('Fetch Failed')
	// 	}

	// 	return {
	// 		...data,
	// 		date: new Date(data.date)
	// 	} as ShopRecieptOrder
	// }

	/**
	 * Set the amount of a given product in cart
	 * setting "0" removes it from the cart
	 *
	 * @param quantity amount
	 * @param id Product ID
	 * @returns Cart
	 */

	async function updateQuantity(quantity: number, id: number) {
		const { ok, data } = await xioniFetch(['shop', module, 'cart/update'], {
			method: FetchMethods.UPDATE,
			params: { quantity, id }
		})

		if (!ok || !data) throw new Error('')

		return data as ShopCart
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

	async function validateAddress(address: { [key: string]: string }, type: 'invoice' | 'shipping') {
		const path = ['shop', module, 'order/validate-address']
		const { ok, data } = await xioniFetch(path, {
			method: FetchMethods.POST,
			data: address,
			params: { type }
		})

		if (!ok || !data) {
			throw new Error('Faild loading ' + path)
		}

		return data as { valid: boolean; errors?: { [key: string]: string } }
	}

	return {
		// getReciept,
		updateQuantity,
		validateAddress,
		addItem
	}
}
