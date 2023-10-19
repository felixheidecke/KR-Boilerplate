import { Cart, Categories } from './api'
import xioniLoader from '$lib/boilerplate/utils/xioni-loader'
import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

export const load = async function () {
	Cart.getCart()

	return {
		categories: (await xioniLoader(Categories.getCategories())) as XioniShop.Category[]
	}
}

export const prerender = false
export const ssr = false
