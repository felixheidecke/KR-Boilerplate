import { orderApi } from '../shop.api'
import { ORDER } from '../shop.stores'

export const prerender = false
export const ssr = false
export function load() {
	orderApi
		.getOrder()
		.then(ORDER.set)
		.catch(response => console.log(response.data.message))
}
