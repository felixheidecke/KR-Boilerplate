import { CART } from '$lib/stores'
import { useCart } from '$lib/boilerplate/xioni/shop/Cart'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { useGroups } from '$lib/boilerplate/xioni/shop/Groups'

export const prerender = false
export const ssr = false

export async function load() {
	const [groups, cart] = await Promise.all([
		xioniLoader(useGroups().getGroups()),
		xioniLoader(useCart().getCart())
	])

	CART.set(cart)

	return {
		groups
	}
}
