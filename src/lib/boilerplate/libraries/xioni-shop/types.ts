export namespace XioniShop {
	export interface Cart {
		products: {
			product: Product
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
			value: number
			formatted: string
			title: string
			text: string
		}
		shippingCost: {
			value: number
			formatted: string
		}
		shippingUnit: string
		total: {
			value: number
			formatted: string
		}
	}

	export interface Category {
		id: number
		name: string
		slug: string
		description?: string
	}

	export interface CheckoutOrder {
		type: 'Rechnung' | 'Vorkasse'
		invoice?: {
			salutation: string
			firstname: string
			name: string
			address: string
			zip: string
			city: string
			email: string
		}
	}

	export interface Product {
		id: number
		module: number
		name: string
		slug: string
		code?: string
		ean?: string
		isHighlight: boolean
		description?: string
		teaser?: string
		legalInfo?: string
		image?: {
			src: string
			largeSrc: string
		}
		pdf?: {
			src: string
			name: string
			title: string
		}
		category?: {
			id: number
			name: string
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
		price: {
			value: number
			formatted: string
		}
		vat: {
			value: number
			formatted: string
		}
		pricePerUnit: {
			value: number
			formatted: string
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
