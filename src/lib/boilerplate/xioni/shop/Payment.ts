import { API_BASE_URL } from '../constants'
import Axios from 'axios'
import config from '$lib/app.config'

// --- Factory -------------------------------------------------------------------------------------

export function usePayment(module: number, fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: new URL('v5', API_BASE_URL).toString(),
		headers: {
			'api-key': config.krApiKey
		}
	})

	async function createPayPalTransaction(transactionId: string): Promise<string> {
		try {
			const { data } = await axios.post<{ orderId: string }>(
				`shop/${module}/payment/paypal/create`,
				{
					transactionId
				}
			)
			return data.orderId
		} catch (error) {
			throw error
		}
	}

	async function capturePayPalTransaction(orderId: string): Promise<boolean> {
		try {
			await axios.post(`shop/${module}/payment/paypal/capture`, {
				orderId
			})

			return true
		} catch (error) {
			throw error
		}
	}

	return {
		createPayPalTransaction,
		capturePayPalTransaction
	}
}
