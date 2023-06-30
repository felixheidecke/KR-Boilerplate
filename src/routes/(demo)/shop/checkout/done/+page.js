import { CART } from '../../_stores/cart'

export const prerender = false

export const load = async function () {
	CART.reset()
}
