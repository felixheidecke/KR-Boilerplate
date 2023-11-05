import { Order } from '../api'

export const prerender = false
export const ssr = false
export const load = () => {
	Order.getOrder()
}
