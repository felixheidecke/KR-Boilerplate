import * as Shop from '$lib/boilerplate/xioni/shop'
import { shopModule } from './shopConfig.js'

export const cart = Shop.useCart(shopModule)
export const products = Shop.useProducts(shopModule)
export const categories = Shop.useCategories(shopModule)
export const info = Shop.useInfo(shopModule)
export const order = Shop.useOrder(shopModule)
export const payment = Shop.usePayment(shopModule)

// Stores
export const CART = Shop.useCartStore({ ...cart })
export const ORDER = Shop.useOrderStore({ ...order })
