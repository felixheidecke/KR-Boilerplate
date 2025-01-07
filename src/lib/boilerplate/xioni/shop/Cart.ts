import type { XioniShop } from '../types'
import Axios from 'axios'
import config from '$lib/app.config'

export function useCart(module: number, fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: config.api.url,
		headers: { 'api-key': config.api.key }
	})

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart(): Promise<XioniShop.Cart> {
		try {
			const { data } = await axios.get<XioniShop.Cart>(`shop/${module}/cart`)

			return data
		} catch (error) {
			throw error
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

	async function updateItemQuantity(id: number, quantity: number): Promise<XioniShop.Cart> {
		try {
			const { data } = await axios.put<XioniShop.Cart>(`shop/${module}/cart`, {
				data: [{ productId: id, quantity }]
			})

			return data
		} catch (error) {
			throw error
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
			const { data } = await axios.put<XioniShop.Cart>(`shop/${module}/cart`, {
				data: [{ productId: id, quantity: 1 }]
			})

			return data
		} catch (error) {
			throw error
		}
	}

	return {
		getCart,
		updateItemQuantity,
		addItem
	}
}
