import { FetchMethods, FetchResponseStatus, type FetchResponse } from '../../fetch-json/types'
import XioniFetch from '../../xioni-fetch'
import EventEmitter from 'eventemitter3'

// --- Types ---------------------------------------------------------------------------------------

import type { XioniFetchErrorResponse } from '../../xioni-fetch/types'
import type { XioniResponse } from '../../xioni/types'
import type { XioniShop } from '../types'

// --- Factory -------------------------------------------------------------------------------------

export function OrderFactory(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function createOrder(): Promise<XioniResponse<XioniShop.Order>> {
		const response = await xioniFetch(['shop', module, 'order'], { method: FetchMethods.POST })

		if (response.status === FetchResponseStatus.SUCCESS) {
			const order = editOrder(response.data) as XioniShop.Order

			event.emit('created', order)
			return [order, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error)
			return [undefined, error]
		}
	}

	async function updateOrder(update: {
		address?: XioniShop.Order['address']
		shippingAddress?: XioniShop.Order['shippingAddress'] | null
		paymentType?: XioniShop.Order['paymentType']
		message?: XioniShop.Order['message'] | null
	}): Promise<XioniResponse<XioniShop.Order>> {
		const response = await xioniFetch(['shop', module, 'order'], {
			method: FetchMethods.PATCH,
			data: update
		})

		if (response.status === FetchResponseStatus.SUCCESS) {
			const order = editOrder(response.data) as XioniShop.Order

			event.emit('updated', order)
			return [order, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error)
			return [undefined, error]
		}
	}

	async function getOrder(id?: string | number): Promise<XioniResponse<XioniShop.Order>> {
		const url = id ? ['shop', module, 'order', id] : ['shop', module, 'order']
		const response = (await xioniFetch(url)) as FetchResponse<any>

		if (response.status === FetchResponseStatus.SUCCESS) {
			const order = editOrder(response.data) as XioniShop.Order

			event.emit('loaded', order)
			return [order, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error)
			return [undefined, error]
		}
	}

	/**
	 * Create a Paypal Order
	 *
	 * @returns Order ID
	 */

	async function createPaypalOrder(): Promise<XioniResponse<unknown>> {
		const path = ['shop', module, 'order/paypal/create']
		const response = (await xioniFetch(path, {
			method: FetchMethods.POST
		})) as FetchResponse<any>

		if (response.status === FetchResponseStatus.SUCCESS) {
			return [editOrder(response.data), undefined]
		} else {
			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	/**
	 * Catch an Paypal Order
	 *
	 * @param id Order ID
	 * @returns
	 */

	async function capturePaypalOrder(id: string): Promise<XioniResponse<string>> {
		const path = ['shop', module, 'order/paypal/capture']
		const response = await xioniFetch(path, {
			method: FetchMethods.POST,
			params: { id }
		})

		if (response.status === FetchResponseStatus.SUCCESS) {
			return [response.data as any, undefined]
		} else {
			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	return {
		updateOrder,
		createOrder,
		getOrder,
		$event: event
	}
}

// Helper

function editOrder(order: any): XioniShop.Order {
	return {
		...order,
		date: new Date(order.date),
		paymentType: mapPaymenType(order.paymentType)
	}
}

function mapPaymenType(paymentType: string) {
	switch (paymentType) {
		case 'paypal':
			return 'Paypal'
		case 'prepayment':
			return 'Vorkasse'
		default:
			return paymentType
	}
}
