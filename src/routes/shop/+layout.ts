import { CART } from './shop.stores'
import { cartApi, groupsApi } from './shop.api'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

export const prerender = false
export const load = async function () {
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
