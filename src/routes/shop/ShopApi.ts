import * as Shop from '$lib/boilerplate/xioni/shop/index.js'
import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'
import { shopModule } from './config.js'
import { writable } from 'svelte/store'

// API
export default {
	cart: Shop.useCart(shopModule),
	products: Shop.useProducts(shopModule),
	categories: Shop.useCategories(shopModule),
	info: Shop.useInfo(shopModule),
	order: Shop.useOrder(shopModule)
}

// Stores
export const CART = writable({} as XioniShop.Cart)
export const ORDER = writable({} as XioniShop.Order)
