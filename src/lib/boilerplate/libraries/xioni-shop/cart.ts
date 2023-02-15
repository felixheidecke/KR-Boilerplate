import fetchJson from '../fetch-json'
import { XIONI_API_URL } from '../../constants'
import { FetchMethods } from '../fetch-json/types'
import type { XioniShopCart, XioniShopCartProduct } from './cart.types'

// --- Factory -------------------------------------------------------------------------------------

export default (module: number, fetchFn: typeof fetch = fetch) => {
	const fetchJSON = fetchJson(fetchFn)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function get() {
		const { ok, data: cart } = await fetchJSON([XIONI_API_URL, 'shop', module, 'cart'], {
			method: FetchMethods.POST,
			data: {}
		})

		if (!ok) return

		return cart as XioniShopCartProduct
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
		const { ok, data: cart } = await fetchJSON([XIONI_API_URL, 'shop', module, 'cart/update'], {
			method: FetchMethods.UPDATE,
			params: { quantity, id }
		})

		if (!ok) return

		return cart as XioniShopCart
	}

	/**
	 * Add given product to the cart.
	 * Will incement the current amount by 1
	 *
	 * @param id Product ID
	 * @returns Cart
	 */

	async function addItem(id: number) {
		const { ok, data: cart } = await fetchJSON([XIONI_API_URL, 'shop', module, 'cart/add'], {
			method: FetchMethods.PATCH,
			params: { id }
		})

		if (!ok) return

		return cart as XioniShopCart
	}

	return {
		get,
		updateQuantity,
		addItem
	}
}
