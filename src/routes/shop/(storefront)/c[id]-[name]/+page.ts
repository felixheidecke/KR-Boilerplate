import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader.js'
import { Categories, Products } from '../../api.js'

import type { XioniShop } from '$lib/boilerplate/xioni/shop/types.js'

export const load = async function ({ params }) {
	const [category, products] = await Promise.all([
		xioniLoader(Categories.getCategory(+params.id)) as Promise<XioniShop.Category>,
		xioniLoader(Products.getProductsByCategory(+params.id)) as Promise<XioniShop.Product[]>
	])

	return {
		category,
		products
	}
}
