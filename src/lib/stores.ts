import { writable } from 'svelte/store'

import type { XioniShop } from '$lib/boilerplate/xioni/types'

// Order

export const ORDER = writable({} as XioniShop.Order)
export const CART = writable({
	gross: {
		value: 0,
		formatted: '0,00 €'
	},
	total: {
		value: 0,
		formatted: '0,00 €'
	},
	weight: 0,
	products: [],
	shipping: {
		price: {
			value: 0,
			formatted: 'kostenlos'
		},
		unit: 'kg.'
	}
} as XioniShop.Cart)
