import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { Order } from '../../api'

import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'

export const load = async function ({ params }) {
	return { order: (await xioniLoader(Order.getOrder(params.id))) as XioniShop.Order }
}

export const prerender = false
export const ssr = false
