import { API_BASE_URL } from '../constants'
import Axios from 'axios'
import config from '$lib/app.config'
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
		baseURL: new URL('v5', API_BASE_URL).toString(),
		headers: {
			'api-key': config.krApiKey
		}
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
			const { data } = await axios.patch(`shop/${module}/order`, update)

			return orderAdapter(data) as XioniShop.Order
		} catch (error) {
			throw error
		}
	}

	async function getOrder(id?: string): Promise<XioniShop.Order> {
		try {
			const { data } = await axios.get(`shop/${module}/order${id ? '/' + id : ''}`)

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
