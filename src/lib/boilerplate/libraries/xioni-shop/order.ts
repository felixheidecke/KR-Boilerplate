import XioniFetch from '../xioni-fetch'
import { isClientError } from './utils'
import { FetchMethods } from '../fetch-json/types'

import type { ShopRecieptOrder } from './order.types'
import type { ErrorResponse } from './types'

// --- Factory -------------------------------------------------------------------------------------

export default function MakeShopOrder(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function getSummary(transactionId: string) {
		const { data, status } = await xioniFetch(['shop', module, 'order', transactionId])

		if (isClientError(status)) {
			return { success: false, data } as ErrorResponse
		} else {
			return { success: true, data: { ...data, date: new Date(data.date) } } as {
				success: true
				data: ShopRecieptOrder
			}
		}
	}

	async function setAddress(address: { [key: string]: string }, type: 'invoice' | 'shipping') {
		const { data, status } = await xioniFetch(['shop', module, 'order/address'], {
			method: FetchMethods.POST,
			data: address,
			params: { type }
		})

		if (isClientError(status)) {
			return { success: false, data } as ErrorResponse
		} else {
			return { success: true } as { success: true; data: undefined }
		}
	}

	async function createOrder(address: { [key: string]: string }) {
		const { data, status } = await xioniFetch(['shop', module, 'order'], {
			method: FetchMethods.POST,
			data: {
				address
			}
		})

		if (isClientError(status)) {
			return { success: false, data } as ErrorResponse
		} else {
			return { success: true, data: data.transactionId } as { success: true; data: string }
		}
	}

	return {
		setAddress,
		createOrder,
		getSummary
	}
}
