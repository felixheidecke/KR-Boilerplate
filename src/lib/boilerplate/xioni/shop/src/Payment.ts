import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShopData } from '../types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'

// --- Factory -------------------------------------------------------------------------------------

export function usePayment(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()

	async function createPayPalTransaction(transactionId: string): Promise<XioniShopData<string>> {
		const context = { emitter: 'createPayPalTransaction' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'payment/paypal/create'], {
			method: 'POST',
			data: {
				transactionId
			}
		})

		if (response.status === 'success') {
			const orderId = (response.data as any).orderId as string

			event.emit('success', orderId, context)
			event.emit('loading-toggle', false, context)

			return [orderId, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	async function capturePayPalTransaction(orderId: string): Promise<XioniShopData<boolean>> {
		const context = { emitter: 'capturePayPalTransaction' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'payment/paypal/capture'], {
			method: 'POST',
			data: { orderId }
		})

		if (response.status === 'success') {
			event.emit('success', true, context)
			event.emit('loading-toggle', false, context)

			return [true, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	return {
		createPayPalTransaction,
		capturePayPalTransaction,
		$event: event
	}
}
