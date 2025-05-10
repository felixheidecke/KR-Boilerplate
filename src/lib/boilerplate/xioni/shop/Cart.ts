import appConfig from '$lib/app.config'
import Axios, { type CreateAxiosDefaults } from 'axios'
import type { XioniShop } from '../types'

export function useCart(config?: CreateAxiosDefaults) {
	const { shopApiKey, shopApiBaseUrl } = appConfig

	const axios = Axios.create({
		baseURL: shopApiBaseUrl,
		...config,
		headers: {
			'api-key': shopApiKey,
			...config?.headers
		}
	})

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getCart(): Promise<XioniShop.Cart> {
		try {
			const { data } = await axios.get<XioniShop.Cart>('/cart')

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
			const { data } = await axios.put<XioniShop.Cart>('/cart', [{ productId: id, quantity }])

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
			const { data } = await axios.put<XioniShop.Cart>('/cart', [{ productId: id, quantity: 1 }])

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
