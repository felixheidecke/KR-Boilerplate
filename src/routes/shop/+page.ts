import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'
import xioniLoader from '$lib/boilerplate/utils/xioni-loader'
import type { PageLoad } from './$types'
import { Products } from './api'

export const load: PageLoad = async () => ({
	products: (await xioniLoader(
		Products.getProductHighlights({ parts: ['pdf'] })
	)) as XioniShop.Product[]
})

export const prerender = false
