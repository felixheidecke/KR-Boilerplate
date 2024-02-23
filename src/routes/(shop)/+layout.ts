import { CART, categories, products } from './shopApi'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

import { Xioni } from '$lib/boilerplate/xioni/Xioni.types'
import type { XioniShop } from '$lib/boilerplate/xioni/shop/XioniShop.types'

const { getCategories } = categories
const { getProducts } = products

export const load = async function () {
	const [categories, products] = await Promise.all([
		xioniLoader(getCategories({ detailLevel: Xioni.DetailLevel.BASIC })),
		xioniLoader(getProducts({ detailLevel: Xioni.DetailLevel.BASIC, highlights: true }))
	])

	CART.get()

	return {
		categories: categories as XioniShop.Category.Basic[],
		products: products as XioniShop.Product.Basic[]
	}
}

export const prerender = false
export const ssr = false
