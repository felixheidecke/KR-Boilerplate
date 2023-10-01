import { CART } from './stores'
import { Cart, Categories } from './api'
import xioniLoader from '$lib/boilerplate/utils/xioni-loader'
import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

export const load = async function () {
	const [categories, cart] = await Promise.all([
		xioniLoader(Categories.getCategories()) as Promise<XioniShop.Category[]>,
		xioniLoader(Cart.getCart()) as Promise<XioniShop.Cart>
	])

	CART.set(cart)

	return { categories }
}

export const prerender = false
