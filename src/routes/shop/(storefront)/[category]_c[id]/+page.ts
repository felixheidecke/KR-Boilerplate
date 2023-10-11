import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types.js'
import xioniLoader from '$lib/boilerplate/utils/xioni-loader.js'
import { Categories, Products } from '../../api.js'

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
