import MakeShopCategories from '$lib/boilerplate/libraries/xioni-shop/categories'
import MakeShopProducts from '$lib/boilerplate/libraries/xioni-shop/products'
import sessionStorage from '$lib/boilerplate/utils/session-storage'
import { module } from '../config'

const { getCategory } = MakeShopCategories(module)
const { getProductsByCategory } = MakeShopProducts(module)

export const load = async function ({ params }) {
	const store = sessionStorage(`__kr-xioni/s:${module}/c-cp:${params.id}`)
	const [category, products] =
		store.read() ||
		store.write(await Promise.all([getCategory(params.id), getProductsByCategory(params.id)]))

	return {
		category,
		products
	}
}
