import appConfig from '$lib/app.config'
import Axios, { type CreateAxiosDefaults } from 'axios'

// --- Factory -------------------------------------------------------------------------------------

export function usePayment(config?: CreateAxiosDefaults) {
	const { shopApiKey, shopApiBaseUrl } = appConfig

	const axios = Axios.create({
		baseURL: shopApiBaseUrl,
		...config,
		headers: {
			'api-key': shopApiKey,
			...config?.headers
		}
	})

	async function createPayPalTransaction(transactionId: string): Promise<string> {
		try {
			const { data } = await axios.post<{ orderId: string }>('/payment/paypal/create', {
				transactionId
			})
			return data.orderId
		} catch (error) {
			throw error
		}
	}

	async function capturePayPalTransaction(orderId: string): Promise<boolean> {
		try {
			await axios.post('/payment/paypal/capture', {
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
