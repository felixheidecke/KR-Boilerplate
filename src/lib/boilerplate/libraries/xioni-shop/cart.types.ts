export interface ShopCart {
	products: ShopCartProduct[]
	gross: {
		value: number
		formatted: string
	}
	additionalCost?: {
		title: string
		value: number
		formatted: string
	}
	shipping: {
		value: number
		formatted: string
	}
	total: {
		value: number
		formatted: string
	}
}

export interface ShopCartProduct {
	id: number
	module: number
	name: string
	slug: string
	code?: string
	EAN?: string
	isHighlight: boolean
	price: {
		value: number
		formatted: string
	}
	quantity: number
	total: {
		value: number
		formatted: string
	}
}
