import XioniFetch from '../xioni-fetch'
import type { XioniShopCheckoutOrder } from './checkout.types'
import type { XioniResponse } from '../xioni/types'
import { FetchMethods, FetchResponseStatus } from '../fetch-json/types'

export default function MakeShopCheckout(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Create an ivoiced or prepaid Order
	 *
	 * @param data
	 * @returns
	 */

	async function createOrder(payload: any): Promise<XioniResponse<XioniShopCheckoutOrder>> {
		const url = ['shop', module, 'order/create']
		const { status, data } = await xioniFetch(url, {
			method: FetchMethods.POST,
			data: payload
		})

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	/**
	 * Create a Paypal Order
	 *
	 * @returns Order ID
	 */

	async function createPaypalOrder(): Promise<XioniResponse<unknown>> {
		const path = ['shop', module, 'order/paypal/create']
		const { status, data } = await xioniFetch(path, {
			method: FetchMethods.POST
		})

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	/**
	 * Catch an Paypal Order
	 *
	 * @param id Order ID
	 * @returns
	 */

	async function capturePaypalOrder(id: string): Promise<XioniResponse<string>> {
		const path = ['shop', module, 'order/paypal/capture']
		const { status, data } = await xioniFetch(path, {
			method: FetchMethods.POST,
			params: { id }
		})

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data.id, undefined]
	}

	return {
		createOrder,
		createPaypalOrder,
		capturePaypalOrder
	}
}
