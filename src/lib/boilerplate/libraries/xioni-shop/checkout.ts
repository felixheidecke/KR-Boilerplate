import { FetchMethods } from '../fetch-json/types'
import XioniFetch from '../xioni-fetch'
import type { XioniShopCheckoutOrder } from './checkout.types'

export default function MakeShopCheckout(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Create an ivoiced or prepaid Order
	 *
	 * @param data
	 * @returns
	 */

	async function createOrder(data: any) {
		const url = ['shop', module, 'order/create']
		const { ok, data: order } = await xioniFetch(url, {
			method: FetchMethods.POST,
			data
		})

		if (!ok) return

		return order as unknown as XioniShopCheckoutOrder
	}

	/**
	 * Create a Paypal Order
	 *
	 * @returns Order ID
	 */

	async function createPaypalOrder() {
		const path = ['shop', module, 'order/paypal/create']
		const { ok, data: order } = await xioniFetch(path, {
			method: FetchMethods.POST
		})

		if (!ok || !order) {
			throw new Error('Faild loading ' + path)
		}

		return order as unknown
	}

	/**
	 * Catch an Paypal Order
	 *
	 * @param id Order ID
	 * @returns
	 */

	async function capturePaypalOrder(id: string) {
		const path = ['shop', module, 'order/paypal/capture']
		const { ok, data: order } = await xioniFetch(path, {
			method: FetchMethods.POST,
			params: { id }
		})

		if (!ok || !order) {
			throw new Error('Faild loading ' + path)
		}

		return order.id as string
	}

	return {
		createOrder,
		createPaypalOrder,
		capturePaypalOrder
	}
}
