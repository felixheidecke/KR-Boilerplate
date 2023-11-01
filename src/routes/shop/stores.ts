import { writable } from 'svelte/store'
import { Cart, Order } from './api'

import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

export const CART = writable({} as XioniShop.Cart)
export const ORDER = writable({} as XioniShop.Order)

// prettier-ignore
Cart.$event
	.on('updated', CART.set)
	.on('loaded', CART.set)

Order.$event
	.on('updated', ORDER.set)
	.on('loaded', (order: XioniShop.Order) => {
		// Do not set order if it is complete
		if (!order.transactionId) {
			ORDER.set(order)
		}
	})
	.on('created', () => {
		// Reset stores, once the order was created
		CART.set({} as any)
		ORDER.set({} as any)
	})
