import config from '$lib/app.config'
import Axios from 'axios'
import type { XioniShop } from '../types'

type UpdateOrderParams = {
	address?: XioniShop.Order['address']
	deliveryAddress?: XioniShop.Order['deliveryAddress'] | null
	paymentType?: XioniShop.Order['paymentType']
	message?: XioniShop.Order['message'] | null
}

// --- Factory -------------------------------------------------------------------------------------

export function useOrder(module: number, fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: config.api.url,
		headers: { 'api-key': config.api.key }
	})

	async function createOrder(): Promise<XioniShop.Order> {
		try {
			const { data } = await axios.post(`shop/${module}/order`)

			return orderAdapter(data) as XioniShop.Order
		} catch (error) {
			throw error
		}
	}

	async function updateOrder(update: UpdateOrderParams): Promise<XioniShop.Order> {
		try {
			const { data } = await axios.patch(`shop/${module}/order`, {
				data: update
			})

			return orderAdapter(data) as XioniShop.Order
		} catch (error) {
			throw error
		}
	}

	async function getOrder(id?: string): Promise<XioniShop.Order> {
		try {
			const { data } = await axios.get(`shop/${module}/order/${id}`)

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
