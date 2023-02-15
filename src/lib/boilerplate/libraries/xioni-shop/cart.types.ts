export interface XioniShopCart {
	products: XioniShopCartProduct[]
	gross: {
		value: number
		formatted: string
	}
	additional?: {
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

export interface XioniShopCartProduct {
	id: number
	module: number
	name: string
	slug: string
	code: string
	EAN?: string
	frontpage: boolean
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
