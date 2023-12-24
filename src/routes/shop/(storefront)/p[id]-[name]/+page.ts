import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import Shop from '../../ShopApi'

import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'

export const load = async ({ params }) => {
	const { getProduct } = Shop.products

	return {
		product: (await xioniLoader(getProduct(+params.id))) as XioniShop.Product
	}
}
