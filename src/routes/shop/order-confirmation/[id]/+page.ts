import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'
import xioniLoader from '$lib/boilerplate/utils/xioni-loader'
import { Order } from '../../api'

export const load = async function ({ params }) {
	const order = (await xioniLoader(Order.getOrder(params.id))) as XioniShop.Order

	return { order }
}

export const prerender = false
export const ssr = false
