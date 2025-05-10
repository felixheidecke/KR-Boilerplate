import { useOrder } from '$lib/boilerplate/xioni/shop/Order'
import { ORDER } from '$lib/stores'

export const prerender = false

export async function load() {
	useOrder()
		.getOrder()
		.then(ORDER.set)
		.catch(response => console.error(response.data.message))
}
