import config from './shop.config'
import { useCart } from '$lib/boilerplate/xioni/shop/Cart'
import { useGroups } from '$lib/boilerplate/xioni/shop/Groups'
import { useInfo } from '$lib/boilerplate/xioni/shop/Info'
import { useOrder } from '$lib/boilerplate/xioni/shop/Order'
import { usePayment } from '$lib/boilerplate/xioni/shop/Payment'
import { useProducts } from '$lib/boilerplate/xioni/shop/Products'

export const cartApi = useCart(config.module)
export const productsApi = useProducts(config.module)
export const groupsApi = useGroups(config.module)
export const infoApi = useInfo(config.module)
export const orderApi = useOrder(config.module)
export const paymentApi = usePayment(config.module)

export default {
	cart: cartApi,
	products: productsApi,
	groups: groupsApi,
	info: infoApi,
	order: orderApi,
	payment: paymentApi
}
