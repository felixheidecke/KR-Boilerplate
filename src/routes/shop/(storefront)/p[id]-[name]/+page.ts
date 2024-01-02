import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { products } from '../../shopApi'
import type { XioniShop } from '$lib/boilerplate/xioni/shop/types.js'

const { getProduct } = products

export const load = async ({ params }) => ({
	product: (await xioniLoader(getProduct(+params.id))) as XioniShop.Product
})
