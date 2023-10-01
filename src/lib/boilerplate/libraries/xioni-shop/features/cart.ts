import XioniFetch from '../../xioni-fetch'
import type { XioniResponse } from '../../xioni/types'
import { FetchMethods, FetchResponseStatus } from '../../fetch-json/types'
import type { XioniShop } from '../types'
import { readLocalCart, updateLocalCart, writeLocalCart } from '../local-cart'

export function CartFactory(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart(): Promise<XioniResponse<XioniShop.Cart>> {
		const { status, data } = await xioniFetch(['shop', module, 'cart'], {
			method: FetchMethods.PUT,
			data: readLocalCart(module)
		})

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
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
	): Promise<XioniResponse<XioniShop.Cart>> {
		const { status, data } = await xioniFetch(['shop', module, 'cart'], {
			method: FetchMethods.PUT,
			data: updateLocalCart(module, { [id]: quantity })
		})

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	/**
	 * Add given product to the cart.
	 * Will incement the current amount by 1
	 *
	 * @param id Product ID
	 * @returns Cart
	 */

	async function addItem(id: number): Promise<XioniResponse<XioniShop.Cart>> {
		const { status, data } = await xioniFetch(['shop', module, 'cart'], {
			method: FetchMethods.PUT,
			data: updateLocalCart(module, { [id]: 1 })
		})
		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	function resetCart() {
		writeLocalCart(module, {})
	}

	return {
		getCart,
		updateItemQuantity,
		addItem,
		resetCart
	}
}
