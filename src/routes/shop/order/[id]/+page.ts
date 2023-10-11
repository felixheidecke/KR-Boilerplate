import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { orderApi } from '../../shop.api'

export const prerender = false
export const ssr = false
export const load = async ({ params }) => ({
	order: await xioniLoader(orderApi.getOrder(params.id))
})
