import { CART } from './stores'
import CategoryAPI from '$lib/boilerplate/libraries/xioni-shop/categories'
import CartAPI from '$lib/boilerplate/libraries/xioni-shop/cart'
import InfoAPI from '$lib/boilerplate/libraries/xioni-shop/info'

const module = 990

export function load({ fetch }) {
	try {
		CartAPI(module, fetch).get(CART.set)

		return {
			info: InfoAPI(module, fetch).get(),
			categories: CategoryAPI(module, fetch).getAll(),
			module
		}
	} catch (error) {
		console.error(error)
		return {}
	}
}
