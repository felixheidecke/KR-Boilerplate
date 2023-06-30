import MakeShopOrder from '$lib/boilerplate/libraries/xioni-shop/order'
import localStorage from '$lib/boilerplate/utils/local-storage'
import { writable, type Writable } from 'svelte/store'
import { module } from '../config'

const Order = MakeShopOrder(module)

// --- [ Types ] -----------------------------------------------------------------------------------

import { StoreState } from './types'

const addressStoreModel = {
	address: {} as { [key: string]: string },
	errors: {} as { [key: string]: string },
	isValid: false
}

function MakeAddress(type: 'invoice' | 'shipping', stateStore: Writable<StoreState>) {
	const storage = localStorage(`shop-${type}-address`)
	const { subscribe, set } = writable({
		...addressStoreModel,
		address: storage.read() || {}
	})

	async function validate(address: any) {
		storage.write(address)

		try {
			stateStore.set(StoreState.LOADING)
			const { errors, valid } = await Order.validateAddress(address, type)
			set({
				address,
				errors: errors || {},
				isValid: valid
			})
			stateStore.set(StoreState.DONE)
		} catch {
			stateStore.set(StoreState.FAILED)
		}
	}

	return {
		subscribe,
		validate
	}
}
export const INVOICE_ADDRESS_STATE = writable(StoreState.INITIAL)

export const INVOICE_ADDRESS = MakeAddress('invoice', INVOICE_ADDRESS_STATE)

export const SHIPPING_ADDRESS_STATE = writable(StoreState.INITIAL)

export const SHIPPING_ADDRESS = MakeAddress('shipping', SHIPPING_ADDRESS_STATE)
