import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../xioniShop.types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import { writable } from 'svelte/store'

export function useProducts(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()
	/**
	 * Get all products
	 *
	 * @param limit Max amount of products returned
	 * @returns List of Products
	 */

	async function getProducts(params?: {
		limit?: number
		frontpage?: boolean
	}): Promise<XioniShopData<XioniShop.Product[]>> {
		const context = { emitter: 'getProducts' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'products'], { params })

		if (response.status === 'success') {
			const cart = response.data as XioniShop.Product[]

			event.emit('success', cart, context)
			event.emit('loading-toggle', false, context)

			return [cart, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	/**
	 * Get a single product
	 *
	 * @param id product id
	 * @returns Product
	 */

	async function getProduct(id: number): Promise<XioniShopData<XioniShop.Product>> {
		const context = { emitter: 'getProduct' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'products', id])

		if (response.status === 'success') {
			const product = response.data as XioniShop.Product

			event.emit('success', product, context)
			event.emit('loading-toggle', false, context)

			return [product, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	/**
	 * Get produtcs corresponding to a given Category
	 *
	 * @param category Category id
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProductsByGroup(
		category: number,
		params?: {
			limit?: number
			recursive?: boolean
		}
	): Promise<XioniShopData<XioniShop.Product[]>> {
		const context = { emitter: 'getProductsByGroup' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'groups', category, 'products'], { params })

		if (response.status === 'success') {
			const product = response.data as XioniShop.Product[]

			event.emit('success', product, context)
			event.emit('loading-toggle', false, context)

			return [product, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	return {
		getProduct,
		getProducts,
		getProductsByGroup,
		$event: event
	}
}

export function useProductsStore(products: ReturnType<typeof useProducts>) {
	const { subscribe, set, update } = writable(
		{
			data: [] as XioniShop.Product[],
			isLoading: false,
			errors: null as XioniFetchErrorResponse | null
		},
		() => {
			products.$event.on('success', data => {
				set({ data, isLoading: false, errors: null })
			})

			products.$event.on('error', errors => {
				update(({ data }) => ({ data, isLoading: false, errors }))
			})

			products.$event.on('loading-toggle', isLoading => {
				// isLoading = false will be set by success and error handlers
				if (!isLoading) return

				update(({ data, errors }) => ({ data, isLoading, errors }))
			})

			return function () {
				products.$event.removeAllListeners()
			}
		}
	)

	return {
		subscribe,
		get: products.getProducts
	}
}
