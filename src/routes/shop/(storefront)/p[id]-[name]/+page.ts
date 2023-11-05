import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { Products } from '../../api'

import type { XioniShop } from '$lib/boilerplate/xioni/shop-api/types'

export const load = async ({ params }) => ({
	product: (await xioniLoader(Products.getProduct(+params.id))) as XioniShop.Product
})
