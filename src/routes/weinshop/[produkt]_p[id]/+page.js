import ProductAPI from '$lib/boilerplate/libraries/xioni-shop/products'

export async function load({ fetch, parent, params }) {
	const { module } = await parent()

	try {
		return {
			product: ProductAPI(module, fetch).getOne(params.id)
		}
	} catch (error) {
		console.error(error)
	}
}
