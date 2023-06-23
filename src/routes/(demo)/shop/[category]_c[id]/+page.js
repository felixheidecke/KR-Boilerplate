import { CATEGORY, CATEGORY_PRODUCTS } from '../stores'
import MakeShopCategories from '$lib/boilerplate/libraries/xioni-shop/categories'
import MakeShopProducts from '$lib/boilerplate/libraries/xioni-shop/products'

export const prerender = false

export const load = async function ({ fetch, parent, params }) {
	const { module } = await parent()
	const { getProductsByCategory } = MakeShopProducts(module, fetch)
	const { getCategory } = MakeShopCategories(module, fetch)

	// Fix propper array update
	CATEGORY_PRODUCTS.set([])

	CATEGORY.set(await getCategory(params.id))
	CATEGORY_PRODUCTS.set(await getProductsByCategory(+params.id))
}
