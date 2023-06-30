import MakeShopProducts from '$lib/boilerplate/libraries/xioni-shop/products'
import sessionStorage from '$lib/boilerplate/utils/session-storage'
import { module } from '../config.js'

export const prerender = false

export const load = async function ({ params, fetch }) {
	const { getProduct } = MakeShopProducts(module, fetch)

	const id = +params.id
	const store = sessionStorage(`__kr-xioni/s:${module}/p:${id}`)
	const product = store.read() || store.write(await getProduct(id))

	return {
		product
	}
}
