import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import Shop from '../../ShopApi'

import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'

export const load = async function ({ params }) {
	return {
		order: (await xioniLoader(Shop.order.getOrder(params.id))) as XioniShop.Order
	}
}

export const prerender = false
export const ssr = false
