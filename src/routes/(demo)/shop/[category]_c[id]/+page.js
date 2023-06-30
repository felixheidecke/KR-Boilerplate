import MakeShopCategories from '$lib/boilerplate/libraries/xioni-shop/categories'
import MakeShopProducts from '$lib/boilerplate/libraries/xioni-shop/products'
import sessionStorage from '$lib/boilerplate/utils/session-storage'
import { module } from '../config'

export const prerender = false

export const load = async function ({ params, fetch }) {
	const { getCategory } = MakeShopCategories(module, fetch)
	const { getProductsByCategory } = MakeShopProducts(module, fetch)

	const id = +params.id
	const store = sessionStorage(`__kr-xioni/s:${module}/c-cp:${id}`)
	const { category, products } =
		store.read() ||
		store.write({
			category: await getCategory(id),
			products: await getProductsByCategory(id)
		})

	return {
		category,
		products
	}
}
