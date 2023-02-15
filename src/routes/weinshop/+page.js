import ProductApi from '$lib/boilerplate/libraries/xioni-shop/products'

export async function load({ fetch, parent }) {
	const { module } = await parent()

	return {
		products: ProductApi(module, fetch).getFromFrontpage()
	}
}
