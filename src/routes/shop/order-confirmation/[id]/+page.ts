import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { Order } from '../../api'

import type { XioniShop } from '$lib/boilerplate/xioni/shop-api/types'

export const load = async function ({ params }) {
	const order = (await xioniLoader(Order.getOrder(params.id))) as XioniShop.Order

	return { order }
}

export const prerender = false
export const ssr = false
