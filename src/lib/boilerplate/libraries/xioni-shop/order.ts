import XioniFetch from '../xioni-fetch'
import { FetchMethods, FetchResponseStatus } from '../fetch-json/types'

import type { ShopRecieptOrder } from './order.types'
import type { XioniResponse } from '../xioni/types'

// --- Factory -------------------------------------------------------------------------------------

export default function MakeShopOrder(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getSummary(transactionId: string): Promise<XioniResponse<ShopRecieptOrder>> {
		const { data, status } = await xioniFetch(['shop', module, 'order', transactionId])

		if (status === FetchResponseStatus.SUCCESS) {
			return [undefined, { ...data, date: new Date(data.date) }]
		} else {
			return [data, undefined]
		}
	}

	async function setAddress(
		address: { [key: string]: string },
		type: 'invoice' | 'shipping'
	): Promise<XioniResponse<true>> {
		const { data, status } = await xioniFetch(['shop', module, 'order/address'], {
			method: FetchMethods.POST,
			data: address,
			params: { type }
		})

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	async function createOrder(address: { [key: string]: string }): Promise<XioniResponse<string>> {
		const { data, status } = await xioniFetch(['shop', module, 'order'], {
			method: FetchMethods.POST,
			data: {
				address
			}
		})

		if (status === FetchResponseStatus.SUCCESS) {
			return [undefined, data.transactionId]
		} else {
			return [data, undefined]
		}
	}

	return {
		setAddress,
		createOrder,
		getSummary
	}
}
