import { Products } from '../../api'
import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'
import xioniLoader from '$lib/boilerplate/utils/xioni-loader'

export const load = async ({ params }) => ({
	product: (await xioniLoader(Products.getProduct(+params.id))) as XioniShop.Product
})
