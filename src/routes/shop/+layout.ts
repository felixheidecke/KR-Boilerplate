import { beforeNavigate } from '$app/navigation'
import { CART, categories, products } from './shopApi'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'

const { getCategories } = categories
const { getProductHighlights } = products

export const load = async function () {
	CART.get()

	const [categories, products] = await Promise.all([
		xioniLoader(getCategories()),
		xioniLoader(getProductHighlights())
	])

	return {
		categories: categories as XioniShop.Category[],
		products: products as XioniShop.Product[]
	}
}

export const prerender = false
export const ssr = false

beforeNavigate
