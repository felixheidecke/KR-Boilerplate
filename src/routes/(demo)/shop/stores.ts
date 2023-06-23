import type { ShopCart } from '$lib/boilerplate/libraries/xioni-shop/cart.types'
import type { ShopCategory } from '$lib/boilerplate/libraries/xioni-shop/categories.types'
import type { ShopProduct } from '$lib/boilerplate/libraries/xioni-shop/products.types'
import { writable } from 'svelte/store'

export const CATEGORIES = writable([] as ShopCategory[])

export const CATEGORY = writable({} as ShopCategory)

export const CATEGORY_PRODUCTS = writable([] as ShopProduct[])

export const PRODUCT_HIGHLIGHTS = writable([] as ShopProduct[])

export const PRODUCT = writable({} as ShopProduct)

export const CART = writable({} as ShopCart)

export const INVOICE_ADDRESS = writable({})

export const SHIPPING_ADDRESS = writable({})
