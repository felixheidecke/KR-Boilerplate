import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader.js'
import { categories, products } from '../../shopApi'
import type { XioniShop } from '$lib/boilerplate/xioni/shop/types.js'

const { getCategory } = categories
const { getProductsByCategory } = products

export const load = async function ({ params }) {
	const [category, products] = await Promise.all([
		xioniLoader(getCategory(+params.id)) as Promise<XioniShop.Category>,
		xioniLoader(getProductsByCategory(+params.id)) as Promise<XioniShop.Product[]>
	])

	return {
		category,
		products
	}
}
