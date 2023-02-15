import CategoryAPI from '$lib/boilerplate/libraries/xioni-shop/categories'
import ProductAPI from '$lib/boilerplate/libraries/xioni-shop/products'

export async function load({ fetch, parent, params }) {
	const { module } = await parent()

	return {
		category: CategoryAPI(module, fetch).getOne(params.id),
		products: ProductAPI(module, fetch).getByCategory(params.id)
	}
}
