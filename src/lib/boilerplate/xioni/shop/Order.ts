import { xioniFetch, type XioniFetchErrorResponse } from '../utils/xioniFetch'

import type { XioniShop } from '../types'

type UpdateOrderParams = {
	address?: XioniShop.Order['address']
	deliveryAddress?: XioniShop.Order['deliveryAddress'] | null
	paymentType?: XioniShop.Order['paymentType']
	message?: XioniShop.Order['message'] | null
}

// --- Factory -------------------------------------------------------------------------------------

export function useOrder(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)

	async function createOrder(): Promise<XioniShop.Order> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'order'], { method: 'POST' })

			if (response.status === 'success') {
				resolve(orderAdapter(response.data) as XioniShop.Order)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	async function updateOrder(update: UpdateOrderParams): Promise<XioniShop.Order> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'order'], {
				method: 'PATCH',
				data: update
			})

			if (response.status === 'success') {
				resolve(orderAdapter(response.data) as XioniShop.Order)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	async function getOrder(id?: string): Promise<XioniShop.Order> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'order', id])

			if (response.status === 'success') {
				const order = resolve(orderAdapter(response.data) as XioniShop.Order)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	return {
		createOrder,
		updateOrder,
		getOrder
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
