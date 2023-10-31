import { Cart, Categories } from './api'
import { Products } from './api'
import xioniLoader from '$lib/boilerplate/utils/xioni-loader'

import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

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
