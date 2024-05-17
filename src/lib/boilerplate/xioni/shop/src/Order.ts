import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'
import { writable } from 'svelte/store'

import type { XioniShop, XioniShopData } from '../xioniShop.types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'

// --- Factory -------------------------------------------------------------------------------------

export function useOrder(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()

	async function createOrder(): Promise<XioniShopData<XioniShop.Order>> {
		const context = { emitter: 'createOrder' }

		event.emit('loading-toggle', true, context)

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
	}

	async function updateOrder(update: {
		address?: XioniShop.Order['address']
		deliveryAddress?: XioniShop.Order['deliveryAddress'] | null
		paymentType?: XioniShop.Order['paymentType']
		message?: XioniShop.Order['message'] | null
	}): Promise<XioniShopData<XioniShop.Order>> {
		const context = { emitter: 'updateOrder' }

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

	return {
		createOrder,
		updateOrder,
		getOrder,
		$event: event
	}
}

export function useOrderStore(order: ReturnType<typeof useOrder>) {
	const { subscribe, set, update } = writable(
		{
			data: {} as XioniShop.Order,
			isLoading: false,
			errors: null as XioniFetchErrorResponse | null
		},
		() => {
			order.$event.on('success', data => {
				set({ data, isLoading: false, errors: null })
			})

			order.$event.on('error', errors => {
				update(({ data }) => ({ data, isLoading: false, errors }))
			})

			order.$event.on('loading-toggle', isLoading => {
				update(({ data, errors }) => ({ data, isLoading, errors }))
			})

			return function () {
				order.$event.removeAllListeners()
			}
		}
	)

	return {
		$event: order.$event,
		subscribe,
		get: order.getOrder,
		update: order.updateOrder,
		create: order.createOrder
	}
}

// --- Helper --------------------------------------------------------------------------------------

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
