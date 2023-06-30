import MakeShopProducts from '$lib/boilerplate/libraries/xioni-shop/products'
import sessionStorage from '$lib/boilerplate/utils/session-storage'
import { module } from './config.js'

export const prerender = false

export const load = async function ({ fetch }) {
	const { getProductHighlights } = MakeShopProducts(module, fetch)

	const store = sessionStorage('xioni:getProductHighlights(' + module + ')')
	const products = store.read() || store.write(await getProductHighlights())

	return {
		products
	}
}
