import MakeShopCart from '$lib/boilerplate/libraries/xioni-shop/cart'
import MakeShopCategories from '$lib/boilerplate/libraries/xioni-shop/categories'
import sessionStorage from '$lib/boilerplate/utils/session-storage'
import { CART } from './_stores'
import { module } from './config'

export const prerender = false

export const load = async function ({ fetch }) {
	const { getCart } = MakeShopCart(module, fetch)
	const { getCategories } = MakeShopCategories(module, fetch)

	const store = sessionStorage(`__kr-xioni/s:${module}/c`)
	const categories = store.read() || store.write(await getCategories())

	getCart().then(CART.set)

	return {
		categories
	}
}
