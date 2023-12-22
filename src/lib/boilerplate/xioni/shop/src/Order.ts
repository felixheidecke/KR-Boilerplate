import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'

// --- Factory -------------------------------------------------------------------------------------

export function useOrder(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()

	async function createOrder(): Promise<XioniShopData<XioniShop.Order>> {
		const context = { emitter: 'createOrder' }

		event.emit('loading', context)
		event.emit('loading-toggle', true, context)

		try {
			const response = await fetch(['shop', module, 'order'], { method: 'POST' })

			if (response.status === 'success') {
				const order = orderAdapter(response.data) as XioniShop.Order

				event.emit('success', order, context)
				event.emit('loading-toggle', false, context)

				return [order, undefined]
			} else {
				event.emit('error', response, context)
				event.emit('loading-toggle', false, context)

				return [undefined, response as XioniFetchErrorResponse]
			}
		} catch (error) {
			return [undefined, error as XioniFetchErrorResponse]
		}
	}

	async function updateOrder(update: {
		address?: XioniShop.Order['address']
		shippingAddress?: XioniShop.Order['shippingAddress'] | null
		paymentType?: XioniShop.Order['paymentType']
		message?: XioniShop.Order['message'] | null
	}): Promise<XioniShopData<XioniShop.Order>> {
		const context = { emitter: 'updateOrder' }

		event.emit('loading', context)
		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'order'], {
			method: 'PATCH',
			data: update
		})

		if (response.status === 'success') {
			const order = orderAdapter(response.data) as XioniShop.Order

			event.emit('success', order, context)
			event.emit('loading-toggle', false, context)

			return [order, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	async function getOrder(id?: string): Promise<XioniShopData<XioniShop.Order>> {
		const context = { emitter: 'getOrder' }

		event.emit('loading', context)
		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'order', id])

		if (response.status === 'success') {
			const order = orderAdapter(response.data) as XioniShop.Order

			event.emit('success', order, context)
			event.emit('loading-toggle', false, context)

			return [order, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	async function createPayPalOrder(transactionId: string): Promise<XioniShopData<string>> {
		const context = { emitter: 'createPayPalOrder' }

		event.emit('loading', context)
		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'payment/paypal/create'], {
			method: 'POST',
			data: {
				transactionId
			}
		})

		if (response.status === 'success') {
			const orderId = (response.data as any).orderId as string

			event.emit('success', orderId, context)
			event.emit('loading-toggle', false, context)

			return [orderId, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	async function capturePaypalOrder(orderId: string): Promise<XioniShopData<boolean>> {
		const context = { emitter: 'capturePaypalOrder' }

		event.emit('loading', context)
		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'payment/paypal/capture'], {
			method: 'POST',
			data: { orderId }
		})

		if (response.status === 'success') {
			event.emit('success', true, context)
			event.emit('loading-toggle', false, context)

			return [true, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	return {
		createOrder,
		updateOrder,
		createPayPalOrder,
		capturePaypalOrder,
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
