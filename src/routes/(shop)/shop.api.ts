import * as Shop from '$lib/boilerplate/xioni/shop'
import config from './shop.config'

export const cart = Shop.useCart(config.module)
export const products = Shop.useProducts(config.module)
export const groups = Shop.useCategories(config.module)
export const info = Shop.useInfo(config.module)
export const order = Shop.useOrder(config.module)
export const payment = Shop.usePayment(config.module)

// Stores
export const CART = Shop.useCartStore({ ...cart })
export const ORDER = Shop.useOrderStore({ ...order })
