import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { useOrder } from '$lib/boilerplate/xioni/shop'
import { shopModule } from '../../shopConfig.js'

import type { XioniShop } from '$lib/boilerplate/xioni/shop/XioniShop.types.js'

const { getOrder } = useOrder(shopModule)

export const load = async ({ params }) => ({
	order: (await xioniLoader(getOrder(params.id))) as XioniShop.Order
})

export const prerender = false
export const ssr = false
