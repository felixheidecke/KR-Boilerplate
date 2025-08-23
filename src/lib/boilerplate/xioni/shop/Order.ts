import { createClient, createShopUrl } from '../api/client'
import type { XioniShop } from '../types'
import type { KyResponse } from 'ky'

type UpdateOrderParams = {
	address?: XioniShop.Order['address']
	deliveryAddress?: XioniShop.Order['deliveryAddress'] | null
	paymentType?: XioniShop.Order['paymentType']
	message?: XioniShop.Order['message'] | null
}

// --- Factory -------------------------------------------------------------------------------------

export function useOrder() {
	const client = createClient()

	async function createOrder(): Promise<string> {
		try {
			const data = (await client.post(createShopUrl('order')).json()) as { transactionId: string }

			return data.transactionId
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
		}
	}

	async function updateOrder(update: UpdateOrderParams): Promise<XioniShop.Order> {
		try {
			const data = await client.patch(createShopUrl('order'), { json: update }).json()
			return orderAdapter(data) as XioniShop.Order
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
		}
	}

	async function getOrder(id?: string): Promise<XioniShop.Order> {
		try {
			const data = await client.get(createShopUrl(`order${id ? '/' + id : ''}`)).json()

			return orderAdapter(data) as XioniShop.Order
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
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
