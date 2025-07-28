import type { XioniShop } from '../types'
import { createClient, createUrl } from '../api/client'

type UpdateOrderParams = {
	address?: XioniShop.Order['address']
	deliveryAddress?: XioniShop.Order['deliveryAddress'] | null
	paymentType?: XioniShop.Order['paymentType']
	message?: XioniShop.Order['message'] | null
}

// --- Factory -------------------------------------------------------------------------------------

export function useOrder() {
	const client = createClient()

	async function createOrder(): Promise<XioniShop.Order> {
		try {
			const data = await client.post(createUrl('order'))

			return orderAdapter(data) as XioniShop.Order
		} catch (error) {
			throw error
		}
	}

	async function updateOrder(update: UpdateOrderParams): Promise<XioniShop.Order> {
		try {
			const data = await client.patch(createUrl('order'), { body: JSON.stringify(update) })

			return orderAdapter(data) as XioniShop.Order
		} catch (error) {
			throw error
		}
	}

	async function getOrder(id?: string): Promise<XioniShop.Order> {
		try {
			const data = await client.get(createUrl(`order${id ? '/' + id : ''}`)).json()

			return orderAdapter(data) as XioniShop.Order
		} catch (error) {
			throw error
		}
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
