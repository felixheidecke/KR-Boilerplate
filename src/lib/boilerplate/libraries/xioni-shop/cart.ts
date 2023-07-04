import XioniFetch from '../xioni-fetch'
import { isClientError } from './utils'
import { FetchMethods } from '../fetch-json/types'

import type { ShopCart } from './cart.types'
import type { ErrorResponse } from './types'

// --- Factory -------------------------------------------------------------------------------------

export default function MakeShopCart(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart() {
		const { data } = await xioniFetch(['shop', module, 'cart'])

		return data as ShopCart
	}

	/**
	 * Set the amount of a given product in cart
	 * setting "0" removes it from the cart
	 *
	 * @param id Product ID
	 * @param quantity amount
	 * @returns Cart
	 */

	async function updateItemQuantity(id: number, quantity: number) {
		const { status, data } = await xioniFetch(['shop', module, 'cart'], {
			method: FetchMethods.POST,
			data: {
				id,
				quantity
			}
		})

		if (isClientError(status)) {
			return { success: false, data } as ErrorResponse
		} else {
			return { success: true, data } as { success: true; data: ShopCart }
		}
	}

	/**
	 * Add given product to the cart.
	 * Will incement the current amount by 1
	 *
	 * @param id Product ID
	 * @returns Cart
	 */

	async function addItem(id: number) {
		const { status, data } = await xioniFetch(['shop', module, 'cart'], {
			method: FetchMethods.POST,
			data: { id }
		})

		if (isClientError(status)) {
			return { success: false, data } as ErrorResponse
		} else {
			return { success: true, data } as { success: true; data: ShopCart }
		}
	}

	return {
		getCart,
		updateItemQuantity,
		addItem
	}
}
