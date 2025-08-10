import type { KyResponse } from 'ky'
import { createClient, createShopUrl } from '../api/client'
import type { XioniShop } from '../types'

export function useCart() {
	const client = createClient()
	const url = createShopUrl(`cart`)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart() {
		try {
			return client.get<XioniShop.Cart>(url).json()
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
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

	async function updateItemQuantity(id: number, quantity: number) {
		try {
			return client
				.put<XioniShop.Cart>(url, {
					body: JSON.stringify([{ productId: id, quantity }]),
					headers: { 'Content-Type': 'application/json' }
				})
				.json()
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
		}
	}

	/**
	 * Add given product to the cart.
	 * Will incement the current amount by 1
	 *
	 * @param id Product ID
	 * @returns Cart
	 */

	async function addItem(id: number): Promise<XioniShop.Cart> {
		try {
			return client
				.put<XioniShop.Cart>(url, {
					body: JSON.stringify([{ productId: id, quantity: 1 }]),
					headers: { 'Content-Type': 'application/json' }
				})
				.json()
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
		}
	}

	return {
		getCart,
		updateItemQuantity,
		addItem
	}
}
