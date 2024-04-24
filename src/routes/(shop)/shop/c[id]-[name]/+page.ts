import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader.js'
import { categories, products } from '../../shopApi'

import { Xioni } from '$lib/boilerplate/xioni/xioni.types'
import type { XioniShop } from '$lib/boilerplate/xioni/shop/types.js'

const { getCategory } = categories
const { getProductsByCategory } = products

export const load = async function ({ params }) {
	const [category, products] = await Promise.all([
		xioniLoader(getCategory(+params.id, { detailLevel: Xioni.DetailLevel.EXTENDED })),
		xioniLoader(getProductsByCategory(+params.id))
	])

	return {
		category: category as XioniShop.Category.Extended,
		products: products as XioniShop.Product.Full[]
	}
}
