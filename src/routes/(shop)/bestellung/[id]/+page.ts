import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { useOrder } from '$lib/boilerplate/xioni/shop'
import shopConfig from '../../shop.config'
import type { XioniShop } from '$lib/boilerplate/xioni/shop/xioniShop.types'

const { getOrder } = useOrder(shopConfig.module)

export const load = async ({ params }) => ({
	order: (await xioniLoader(getOrder(params.id))) as XioniShop.Order
})

export const prerender = false
export const ssr = false
