import { browser } from '$app/environment'

type LocalCart = {
	[x: number]: number
}

export function writeLocalCart(module: number, products: LocalCart) {
	if (!browser) return

	const key = 'shop-' + module
	const data = JSON.stringify(products)

	window.localStorage.setItem(key, data)
}

export function readLocalCart(module: number): LocalCart {
	if (!browser) return {}

	const key = 'shop-' + module
	const data = window.localStorage.getItem(key)

	return data ? JSON.parse(data) : {}
}

export function updateLocalCart(module: number, products: LocalCart): LocalCart {
	const cart = {
		...readLocalCart(module),
		...products
	}

	writeLocalCart(module, cart)

	return cart
}
