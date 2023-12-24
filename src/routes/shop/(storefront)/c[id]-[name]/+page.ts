import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader.js'
import Shop from '../../ShopApi.js'

import type { XioniShop } from '$lib/boilerplate/xioni/shop/types.js'

export const load = async function ({ params }) {
	const [category, products] = await Promise.all([
		xioniLoader(Shop.categories.getCategory(+params.id)) as Promise<XioniShop.Category>,
		xioniLoader(Shop.products.getProductsByCategory(+params.id)) as Promise<XioniShop.Product[]>
	])

	return {
		category,
		products
	}
}
