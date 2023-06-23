import { CART, CATEGORIES } from './stores'
import MakeShopCart from '$lib/boilerplate/libraries/xioni-shop/cart'
import MakeShopCategories from '$lib/boilerplate/libraries/xioni-shop/categories'

export const prerender = false

export const load = async function ({ fetch }) {
	const module = 1005
	const { getCart } = MakeShopCart(module, fetch)
	const { getCategories } = MakeShopCategories(module, fetch)
	const [cart, categories] = await Promise.all([getCart(), getCategories()])

	if (cart) CART.set(cart)

	if (categories) CATEGORIES.set(categories)

	return {
		module
	}
}
