import appConfig from '$lib/app.config'
import Axios, { type CreateAxiosDefaults } from 'axios'
import type { XioniShop } from '../types'

type UpdateOrderParams = {
	address?: XioniShop.Order['address']
	deliveryAddress?: XioniShop.Order['deliveryAddress'] | null
	paymentType?: XioniShop.Order['paymentType']
	message?: XioniShop.Order['message'] | null
}

// --- Factory -------------------------------------------------------------------------------------

export function useOrder(config?: CreateAxiosDefaults) {
	const { shopApiKey, shopApiBaseUrl } = appConfig

	const axios = Axios.create({
		baseURL: shopApiBaseUrl,
		...config,
		headers: {
			'api-key': shopApiKey,
			...config?.headers
		}
	})

	async function createOrder(): Promise<XioniShop.Order> {
		try {
			const { data } = await axios.post('/order')

			return orderAdapter(data) as XioniShop.Order
		} catch (error) {
			throw error
		}
	}

	async function updateOrder(update: UpdateOrderParams): Promise<XioniShop.Order> {
		try {
			const { data } = await axios.patch('/order', update)

			return orderAdapter(data) as XioniShop.Order
		} catch (error) {
			throw error
		}
	}

	async function getOrder(id?: string): Promise<XioniShop.Order> {
		try {
			const { data } = await axios.get(`/order${id ? '/' + id : ''}`)

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
