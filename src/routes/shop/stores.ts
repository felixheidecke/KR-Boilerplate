import { writable } from 'svelte/store'
import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'

export const CART = writable({} as XioniShop.Cart)
export const ORDER = writable({} as XioniShop.Order)
