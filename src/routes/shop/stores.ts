import writableSession from '$lib/boilerplate/utils/writable-session'
import { writable } from 'svelte/store'
import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

export const CART = writable({
	products: [],
	gross: { value: 0, formatted: '0,00 €' },
	shippingCost: { value: 0, formatted: '0,00 €' },
	shippingUnit: '',
	total: { value: 0, formatted: '0,00 €' }
} as XioniShop.Cart)

export const CATEGORIES = writable([] as XioniShop.Category[])

export const ADDRESS = writableSession('shop-invoice-address', {} as { [key: string]: string })

export const SHIPPING_ADDRESS = writableSession(
	'shop-shipping-address',
	{} as { [key: string]: string }
)
