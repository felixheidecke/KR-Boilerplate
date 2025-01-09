import { CART } from './shop.stores'
import { cartApi, groupsApi } from './shop.api'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

export const prerender = false

export async function load() {
	const [groups, cart] = await Promise.all([
		xioniLoader(groupsApi.getGroups()),
		xioniLoader(cartApi.getCart())
	])

	CART.set(cart)

	return {
		groups,
		layout: 'shop'
	}
}
