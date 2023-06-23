import type { ShopCart } from '$lib/boilerplate/libraries/xioni-shop/cart.types'

export interface XioniShopCartTableProps {
	products: ShopCart['products']
	additionalCost: ShopCart['additionalCost']
	shipping: ShopCart['shipping']
	total: ShopCart['total']
	quantitySelector?: boolean
}
