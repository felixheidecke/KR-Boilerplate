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

	export interface Group {
		id: number
		path: {
			id: number
			name: string
			slug: string
		}[]
		name: string
		slug: string
		description: string
		subgroups: Group[]
	}

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

	export interface Product {
		id: number
		group: number
		name: string
		slug: string
		highlight: boolean
		code: string
		ean: string
		teaser: string
		description?: string
		image?: Image
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
		pdf?: PDF
		quantity: {
			value: number
			formatted: string
		}
		weight: {
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
			weight: {
				value: number
				formatted: string
			}
			price: {
				value: number
				formatted: string
			}
		}
	}
}

interface Image {
	src: string
	description: string
	align: 'left' | 'right' | null
	srcset: {
		small?: string
		medium?: string
		large?: string
	}
}

interface PDF {
	src: string
	title: string
}

export type XioniApiErrorResponse = {
	message: string
	details: Record<string, { message: string; code: string }[]>
}
