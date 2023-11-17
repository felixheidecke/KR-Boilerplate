import { Order } from '../api'
import { ORDER } from '../stores'

export const prerender = false
export const ssr = false
export const load = async () => {
	const [order] = await Order.getOrder()

	if (order) {
		ORDER.set(order)
	}
}
