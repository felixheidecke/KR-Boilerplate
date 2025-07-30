import { createClient, createShopUrl } from '../api/client'

// --- Factory -------------------------------------------------------------------------------------

export function usePayment() {
	const client = createClient()

	async function createPayPalTransaction(transactionId: string): Promise<string> {
		try {
			const { orderId } = await client
				.post<{ orderId: string }>(createShopUrl('payment/paypal/create'), {
					body: JSON.stringify({ transactionId })
				})
				.json()

			return orderId
		} catch (error) {
			throw error
		}
	}

	async function capturePayPalTransaction(orderId: string): Promise<boolean> {
		try {
			await client.post(createShopUrl('payment/paypal/capture'), {
				body: JSON.stringify({ orderId })
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
