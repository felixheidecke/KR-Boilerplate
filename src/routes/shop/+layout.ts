import Shop, { CART } from './ShopApi'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'

export const load = async function () {
	const [categories, products, cart] = await Promise.all([
		xioniLoader(Shop.categories.getCategories()),
		xioniLoader(Shop.products.getProductHighlights()),
		xioniLoader(Shop.cart.getCart())
	])

	CART.set(cart as XioniShop.Cart)

	return {
		categories: categories as XioniShop.Category[],
		products: products as XioniShop.Product[]
	}
}

export const prerender = false
export const ssr = false
