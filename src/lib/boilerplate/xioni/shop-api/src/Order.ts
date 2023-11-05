import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'

// --- Factory -------------------------------------------------------------------------------------

export function OrderFactory(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get the cart contents
	 *
	 * @returns Cart
	 */

	async function createOrder(): Promise<XioniShopData<XioniShop.Order>> {
		const context = { emitter: 'createOrder' }

		event.emit('creating', context)

		const response = await fetch(['shop', module, 'order'], { method: 'POST' })

		if (response.status === 'success') {
			const order = orderAdapter(response.data) as XioniShop.Order

			event.emit('created', order, context)
			event.emit('finally', context)

			return [order, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	async function updateOrder(update: {
		address?: XioniShop.Order['address']
		shippingAddress?: XioniShop.Order['shippingAddress'] | null
		paymentType?: XioniShop.Order['paymentType']
		message?: XioniShop.Order['message'] | null
	}): Promise<XioniShopData<XioniShop.Order>> {
		const context = { emitter: 'updateOrder' }

		event.emit('updating', context)

		const response = await fetch(['shop', module, 'order'], {
			method: 'PATCH',
			data: update
		})

		if (response.status === 'success') {
			const order = orderAdapter(response.data) as XioniShop.Order

			event.emit('updated', order, context)
			event.emit('finally', context)

			return [order, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	async function getOrder(id?: string | number): Promise<XioniShopData<XioniShop.Order>> {
		const context = { emitter: 'getOrder' }

		event.emit('loading', context)

		const response = await fetch(['shop', module, 'order', id])

		if (response.status === 'success') {
			const order = orderAdapter(response.data) as XioniShop.Order

			event.emit('loaded', order, context)
			event.emit('finally', context)

			return [order, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	/**
	 * Create a Paypal Order
	 *
	 * @returns Order ID
	 */

	async function createPaypalOrder(): Promise<XioniShopData<unknown>> {
		const response = await fetch(['shop', module, 'order/paypal/create'], { method: 'POST' })

		if (response.status === 'success') {
			return [orderAdapter(response.data), undefined]
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

	async function capturePaypalOrder(id: string): Promise<XioniShopData<string>> {
		const path = ['shop', module, 'order/paypal/capture']
		const response = await fetch(path, {
			method: 'POST',
			params: { id }
		})

		if (response.status === 'success') {
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

function orderAdapter(order: any): XioniShop.Order {
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
