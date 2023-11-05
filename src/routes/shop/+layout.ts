import { Cart, Categories } from './api'
import { Products } from './api'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

import type { XioniShop } from '$lib/boilerplate/xioni/shop-api/types'

export const load = async function () {
	const [categories, products] = await Promise.all([
		xioniLoader(Categories.getCategories()),
		xioniLoader(Products.getProductHighlights()),
		Cart.getCart()
	])

	return {
		categories: categories as XioniShop.Category[],
		products: products as XioniShop.Product[]
	}
}

export const prerender = false
export const ssr = false
