import type { XioniShop } from '../types'
import { xioniFetch } from '../utils/xioniFetch'

import type { XioniFetchErrorResponse } from '../utils/xioniFetch'

export function useCart(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	function getCart(): Promise<XioniShop.Cart> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'cart'])

			if (response.status === 'success') {
				resolve(response.data as XioniShop.Cart)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	/**
	 * Set the amount of a given product in cart
	 * setting "0" removes it from the cart
	 *
	 * @param id Product ID
	 * @param quantity amount
	 * @returns Cart
	 */

	async function updateItemQuantity(id: number, quantity: number): Promise<XioniShop.Cart> {
		return new Promise(async (resolve, reject) => {
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
				resolve(response.data as XioniShop.Cart)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	/**
	 * Add given product to the cart.
	 * Will incement the current amount by 1
	 *
	 * @param id Product ID
	 * @returns Cart
	 */

	async function addItem(id: number): Promise<XioniShop.Cart> {
		const context = { emitter: 'addItem', module }

		return new Promise(async (resolve, reject) => {
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
				resolve(response.data as XioniShop.Cart)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	return {
		getCart,
		updateItemQuantity,
		addItem
	}
}
