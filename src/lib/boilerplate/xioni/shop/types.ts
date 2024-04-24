import type { Xioni } from '../xioni.types'
import type { XioniFetchErrorResponse } from '../utils/xioniFetch'

export type XioniShopData<T = unknown> = [T, undefined] | [undefined, XioniFetchErrorResponse]

export namespace XioniShop {
	export interface Cart {
		products: {
			product: Product.Full
			quantity: number
			weight: number
			total: {
				value: number
				formatted: string
			}
		}[]
		gross: {
			value: number
			formatted: string
		}
		supplementalCost?: {
			module: number
			value: number
			formatted: string
			title: string
			text: string
		}
		shipping: {
			price: {
				value: number
				formatted: string
			}
			unit: string
		}
		total: {
			value: number
			formatted: string
		}
	}

	// --- [ Category ] ------------------------------------------------------------------------------

	export type Category = Category.Minimal | Category.Basic | Category.Full | Category.Extended

	export namespace Category {
		export interface Minimal {
			id: number
			$group: number
			name: string
			slug: string
			description: string
		}

		export interface Basic extends Minimal {
			subcategories: Basic[]
		}

		export interface Full extends Basic {
			path: { id: number; name: string; slug: string }[]
		}

		export interface Extended extends Full {
			products: Product[]
			subcategories: Extended[]
		}
	}

	// --- [ Order ] ---------------------------------------------------------------------------------

	export interface Order {
		paymentType: string
		date: Date | null
		transactionId: string
		total: {
			value: number
			formatted: string
		}
		shippingCost: {
			value: number
			formatted: string
		}
		cart: {
			id: number
			name: string
			code: string
			quantity: number
			price: {
				value: number
				formatted: string
			}
			total: {
				value: number
				formatted: string
			}
		}[]
		message: string
		address: {
			company?: string
			salutation: 'Herr' | 'Frau'
			firstname: string
			name: string
			address: string
			zip: string
			city: string
			email: string
			phone: string
		}
		deliveryAddress?: {
			company?: string
			name: string
			address: string
			zip: string
			city: string
			phone: string
		}
	}

	// --- [ Product ] -------------------------------------------------------------------------------

	export type Product = Product.Minimal | Product.Basic | Product.Full

	export namespace Product {
		export interface Minimal {
			id: number
			$group: number
			name: string
			slug: string
			isHighlight: boolean
		}

		export interface Basic extends Minimal {
			code: string
			ean: string
			teaser: string
			description: string
			image?: Xioni.Image
			path: {
				id: number
				name: string
				slug: string
			}[]
			legal: string
			price: {
				value: number
				formatted: string
			}
			vat: {
				value: number
				formatted: string
			}
		}

		export interface Full extends Basic {
			pdf?: {
				src: string
				name: string
				title: string
			}
			quantity: {
				value: number
				formatted: string
				unit?: 'l' | 'kg' | 'ea'
			}
			weight: {
				value: number
				formatted: string
				unit?: 'custom' | 'kg'
			}
			pricePerUnit: {
				value: number
				formatted: string
			}
		}
	}

	export interface Info {
		name: string
		web: URL
		email: string
		phone: string
		address: string
		city: string
		zip: string
		shipping: InfoShipping
	}

	export interface InfoShipping {
		description: string
		rates?: {
			weight: { value: number; formatted: string }
			price: { value: number; formatted: string }
		}
	}
}
