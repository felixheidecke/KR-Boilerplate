import { module } from '../config'
import { writable } from 'svelte/store'
import MakeShopCart from '$lib/boilerplate/libraries/xioni-shop/cart'

// --- [ Types ] -----------------------------------------------------------------------------------

import type { ShopCart } from '$lib/boilerplate/libraries/xioni-shop/cart.types'
import { StoreState } from './types'

const cartStoreModel: ShopCart = {
	products: [],
	gross: { value: 0, formatted: '0,00 €' },
	shipping: { value: 0, formatted: '0,00 €' },
	total: { value: 0, formatted: '0,00 €' }
}

function MakeCartStore() {
	const Cart = MakeShopCart(module)
	const { subscribe, set } = writable(cartStoreModel)

	async function fetchCart() {
		try {
			CART_STATE.set(StoreState.LOADING)
			set(await Cart.getCart())
			CART_STATE.set(StoreState.DONE)
		} catch {
			CART_STATE.set(StoreState.FAILED)
		}
	}

	/**
	 * add product to cart
	 *
	 * @param productId product id
	 */

	async function addToCart(productId: number) {
		await updateItemQuantity(productId, 1)
	}

	/**
	 * Remove an item from the cart
	 *
	 * @param productId product id
	 */

	async function removeFromCart(productId: number) {
		await updateItemQuantity(productId, 0)
	}

	/**
	 * Update the amount of products in the cart
	 *
	 * @param productId product id
	 * @param quantity amount of products to add
	 */

	async function updateItemQuantity(productId: number, quantity: number) {
		try {
			CART_STATE.set(StoreState.LOADING)
			set(await Cart.updateItemQuantity(productId, quantity))
			CART_STATE.set(StoreState.DONE)
		} catch {
			CART_STATE.set(StoreState.FAILED)
		}
	}

	/**
	 * Reset the cart to it's initial state
	 */

	function reset() {
		set(cartStoreModel)
		Cart.resetCart()
	}

	return {
		subscribe,
		fetchCart,
		addToCart,
		removeFromCart,
		updateItemQuantity,
		reset
	}
}

export const CART = MakeCartStore()

export const CART_STATE = writable(StoreState.INITIAL)
