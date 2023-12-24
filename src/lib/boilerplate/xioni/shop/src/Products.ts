import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'

export function useProducts(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()
	/**
	 * Get all products
	 *
	 * @param limit Max amount of products returned
	 * @returns List of Products
	 */

	async function getProducts({
		limit
	}: {
		limit?: number
	}): Promise<XioniShopData<XioniShop.Product[]>> {
		const context = { emitter: 'getProducts' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'products'], {
			params: { limit }
		})

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

	async function getProductsByCategory(
		category: number,
		config: { limit?: number } = {}
	): Promise<XioniShopData<XioniShop.Product[]>> {
		const context = { emitter: 'getProductsByCategory' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'categories', category, 'products'], {
			params: config
		})

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

	/**
	 * Get all frontpage products
	 *
	 * @param limit Limit of products
	 * @returns List of Products
	 */

	async function getProductHighlights(
		config: { limit?: number } = {}
	): Promise<XioniShopData<XioniShop.Product[]>> {
		const context = { emitter: 'getProductHighlights' }
		const params = { ...config, highlight: true }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'products'], { params })

		if (response.status === 'success') {
			const products = response.data as XioniShop.Product[]

			event.emit('success', products, context)
			event.emit('loading-toggle', false, context)

			return [products, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	return {
		getProduct,
		getProductHighlights,
		getProducts,
		getProductsByCategory,
		$event: event
	}
}
