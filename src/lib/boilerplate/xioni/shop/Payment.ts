import type { KyResponse } from 'ky'
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
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
		}
	}

	async function capturePayPalTransaction(orderId: string): Promise<boolean> {
		try {
			await client.post(createShopUrl('payment/paypal/capture'), {
				body: JSON.stringify({ orderId })
			})

			return true
		} catch (error) {
			const errorData = await ((error as any).response as KyResponse).json()

			throw errorData
		}
	}

	return {
		createPayPalTransaction,
		capturePayPalTransaction
	}
}
