import { xioniFetch, type XioniFetchErrorResponse } from '../utils/xioniFetch'

// --- Factory -------------------------------------------------------------------------------------

export function usePayment(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)

	async function createPayPalTransaction(transactionId: string): Promise<string> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'payment/paypal/create'], {
				method: 'POST',
				data: {
					transactionId
				}
			})

			if (response.status === 'success') {
				const orderId = (response.data as any).orderId as string

				resolve(orderId)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	async function capturePayPalTransaction(orderId: string): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['shop', module, 'payment/paypal/capture'], {
				method: 'POST',
				data: { orderId }
			})

			if (response.status === 'success') {
				resolve(true)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	return {
		createPayPalTransaction,
		capturePayPalTransaction
	}
}
