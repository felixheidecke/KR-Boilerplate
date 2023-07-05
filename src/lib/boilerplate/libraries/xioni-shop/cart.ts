import XioniFetch from '../xioni-fetch'
import type { XioniResponse } from '../xioni/types'
import type { ShopCart } from './cart.types'
import { FetchMethods, FetchResponseStatus } from '../fetch-json/types'

export default function MakeShopCart(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart(): Promise<XioniResponse<ShopCart>> {
		const { status, data } = await xioniFetch(['shop', module, 'cart'])

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
	): Promise<XioniResponse<ShopCart>> {
		const { status, data } = await xioniFetch(['shop', module, 'cart'], {
			method: FetchMethods.POST,
			data: {
				id,
				quantity
			}
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

	async function addItem(id: number): Promise<XioniResponse<ShopCart>> {
		const { status, data } = await xioniFetch(['shop', module, 'cart'], {
			method: FetchMethods.POST,
			data: { id }
		})
		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	return {
		getCart,
		updateItemQuantity,
		addItem
	}
}
