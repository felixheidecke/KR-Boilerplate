import MakeShopProducts from '$lib/boilerplate/libraries/xioni-shop/products'
import sessionStorage from '$lib/boilerplate/utils/session-storage'
import { module } from '../config.js'

export const load = async function ({ params, fetch }) {
	const shopProducts = MakeShopProducts(module, fetch)

	const store = sessionStorage(`__kr-xioni/s:${module}/p:${params.id}`)
	const product = store.read() || store.write(await shopProducts.getProduct(params.id))

	return {
		product
	}
}
