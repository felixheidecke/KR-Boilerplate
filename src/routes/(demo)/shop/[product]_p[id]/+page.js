import { CATEGORY, PRODUCT } from '../stores'
import MakeShopProducts from '$lib/boilerplate/libraries/xioni-shop/products'

export const prerender = false

export const load = async function ({ fetch, parent, params }) {
	const { module } = await parent()
	const { getProduct } = MakeShopProducts(module, fetch)

	const product = await getProduct(+params.id)

	if (!product) return

	PRODUCT.set(product)
	CATEGORY.set(product.category)
}
