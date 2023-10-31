import { Order } from '../api'

export const load = () => {
	Order.getOrder()
}
export const prerender = false
export const ssr = false
