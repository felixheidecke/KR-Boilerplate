import config from '$lib/app.config'
import Axios from 'axios'

// --- Factory -------------------------------------------------------------------------------------

export function usePayment(module: number, fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: config.api.url,
		headers: { 'api-key': config.api.key }
	})

	async function createPayPalTransaction(transactionId: string): Promise<string> {
		try {
			const { data } = await axios.post<{ orderId: string }>(
				`shop/${module}/payment/paypal/create`,
				{
					data: {
						transactionId
					}
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
				data: { orderId }
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
