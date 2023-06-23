import { XIONI_API_URL } from '../../constants'
import fetchJson from '../fetch-json'
import { FetchMethods } from '../fetch-json/types'
import type { XioniShopCheckoutOrder } from './checkout.types'

export default function MakeShopCheckout(module: number, fetchFn: typeof fetch = fetch) {
	const fetchJSON = fetchJson(fetchFn)
	/**
	 * Create an ivoiced or prepaid Order
	 *
	 * @param data
	 * @returns
	 */

	async function createOrder(data: any) {
		const { ok, data: order } = await fetchJSON([XIONI_API_URL, 'shop', module, 'order/create'], {
			method: FetchMethods.POST,
			data
		})

		if (!ok) return

		return order as XioniShopCheckoutOrder
	}

	/**
	 * Create a Paypal Order
	 *
	 * @returns Order ID
	 */

	async function createPaypalOrder() {
		const { ok, data: order } = await fetchJSON(
			[XIONI_API_URL, 'shop', module, 'order/paypal/create'],
			{
				method: FetchMethods.POST
			}
		)

		if (!ok) return

		return order as any
	}

	/**
	 * Catch an Paypal Order
	 *
	 * @param id Order ID
	 * @returns
	 */

	async function capturePaypalOrder(id: string) {
		const { ok, data: order } = await fetchJSON(
			[XIONI_API_URL, 'shop', module, 'order/paypal/capture'],
			{
				method: FetchMethods.POST,
				params: { id }
			}
		)

		if (!ok) return

		return order.id as string
	}

	return {
		createOrder,
		createPaypalOrder,
		capturePaypalOrder
	}
}
