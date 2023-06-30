import { FetchMethods } from '../fetch-json/types'
import type { ShopCart } from './cart.types'
import XioniFetch from '../xioni-fetch'
import localStorage from '$lib/boilerplate/utils/local-storage'

// --- Factory -------------------------------------------------------------------------------------

export default function MakeShopCart(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	const {
		read: readToken,
		write: writeToken,
		remove: resetToken
	} = localStorage('kr-shop-token-' + module)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart() {
		const path = ['shop', module, 'cart']
		const { data, ok } = await xioniFetch(path, {
			method: FetchMethods.POST,
			data: {
				token: readToken() ?? ''
			}
		})

		if (!ok || !data) {
			throw new Error('Faild loading ' + path)
		}

		return data.cart as ShopCart
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
		const path = ['shop', module, 'cart/update']
		const { ok, data } = await xioniFetch(path, {
			method: FetchMethods.PATCH,
			data: {
				id,
				quantity,
				token: readToken() ?? ''
			}
		})

		if (!ok) {
			throw new Error('Faild loading ' + path)
		}

		writeToken(data.token)

		return data.cart as ShopCart
	}

	/**
	 * Add given product to the cart.
	 * Will incement the current amount by 1
	 *
	 * @param id Product ID
	 * @returns Cart
	 */

	async function addItem(id: number) {
		const path = ['shop', module, 'cart/add']
		const { ok, data } = await xioniFetch(path, {
			method: FetchMethods.PATCH,
			params: { id }
		})

		if (!ok) {
			throw new Error('Faild loading ' + path)
		}

		writeToken(data.token)

		return data.cart as ShopCart
	}

	return {
		getCart,
		updateItemQuantity,
		addItem,
		resetCart: resetToken
	}
}
