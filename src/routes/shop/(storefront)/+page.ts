import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'
import xioniLoader from '$lib/boilerplate/utils/xioni-loader'
import { Products } from '../api'

export const load = async () => ({
	products: (await xioniLoader(Products.getProductHighlights())) as XioniShop.Product[]
})
