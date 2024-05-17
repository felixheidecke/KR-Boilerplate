import { CART, groups } from './shop.api'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

const { getGroups } = groups

export const load = async function () {
	CART.get()

	return {
		groups: await xioniLoader(getGroups())
	}
}

export const prerender = false
export const ssr = false
