import { Products } from '../../api'
import xioniLoader from '$lib/boilerplate/utils/xioni-loader'

import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

export const load = async ({ params }) => ({
	product: (await xioniLoader(Products.getProduct(+params.id))) as XioniShop.Product
})
