import MakeShopCategories from '$lib/boilerplate/libraries/xioni-shop/categories'
import sessionStorage from '$lib/boilerplate/utils/session-storage'
import { CART } from './_stores/cart'
import { module } from './config'

export const prerender = false

export const load = async function ({ fetch }) {
	const { getCategories } = MakeShopCategories(module, fetch)

	CART.fetchCart()

	const store = sessionStorage(`__kr-xioni/s:${module}/c`)
	const categories = store.read() || store.write(await getCategories())

	return {
		categories
	}
}
