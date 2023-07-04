import { browser } from '$app/environment'
import type { ShopCart } from '$lib/boilerplate/libraries/xioni-shop/cart.types'
import { writable } from 'svelte/store'

export const CART = writable({
	products: [],
	gross: { value: 0, formatted: '0,00 €' },
	shipping: { value: 0, formatted: '0,00 €' },
	total: { value: 0, formatted: '0,00 €' }
} as ShopCart)

export const INVOICE_ADDRESS = MakeAddress('invoice_address', {} as { [key: string]: string })

export const SHIPPING_ADDRESS = MakeAddress('shipping_address', {} as { [key: string]: string })

function MakeAddress(key: string, data: any) {
	const storedData = browser ? window.localStorage.getItem(key) : null
	const initialData = storedData ? JSON.parse(storedData) : data
	const { subscribe, set } = writable(initialData)

	return {
		subscribe,
		set: (data: any) => {
			if (browser) window.localStorage.setItem(key, JSON.stringify(data))

			set(data)
		}
	}
}
