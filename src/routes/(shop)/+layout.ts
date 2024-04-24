import { CART, categories, products } from './shopApi'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'

const { getCategories } = categories
const { getProducts } = products

export const load = async function () {
	const [categories, products] = await Promise.all([
		xioniLoader(getCategories({ detailLevel: 'basic' })),
		xioniLoader(getProducts({ detailLevel: 'basic', highlights: true }))
	])

	CART.get()

	return {
		categories: categories as XioniShop.Category.Basic[],
		products: products as XioniShop.Product.Basic[]
	}
}

export const prerender = false
export const ssr = false
