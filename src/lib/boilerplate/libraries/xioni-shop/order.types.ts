export interface ShopRecieptOrder {
	date: Date
	address: {
		company: string
		salutation: string
		name: string
		firstname: string
		address: string
		zip: string
		city: string
		phone: string
		email: string
	}
	products: {
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
	shippingCost: {
		value: number
		formatted: string
	}
	paymentType: 'prepaid' | 'paypal'
	total: {
		value: number
		formatted: string
	}
}
