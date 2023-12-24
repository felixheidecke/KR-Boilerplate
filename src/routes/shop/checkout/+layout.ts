import Shop, { ORDER } from '../ShopApi'

export const load = async () => {
	const [order] = await Shop.order.getOrder()

	if (order) {
		ORDER.set(order)
	}
}

export const prerender = false
export const ssr = false
