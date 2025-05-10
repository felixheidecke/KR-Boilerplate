import { useOrder } from '$lib/boilerplate/xioni/shop/Order.js'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

export const prerender = false

export const load = async ({ params }) => ({
	order: await xioniLoader(useOrder().getOrder(params.id))
})
