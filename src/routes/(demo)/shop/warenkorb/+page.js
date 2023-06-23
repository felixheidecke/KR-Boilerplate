import MakeShopCart from '$lib/boilerplate/libraries/xioni-shop/cart'
import { CART } from '../stores'

export const prerender = false

export const load = async function ({ fetch, parent }) {
	const { module } = await parent()
	const shopCart = MakeShopCart(module, fetch)
	const shopCartData = await shopCart.getCart()

	if (shopCartData) {
		CART.set(shopCartData)
	}
}
