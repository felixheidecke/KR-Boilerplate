export enum ShopProductQuantityUnit {
	LITER = 'l',
	KILOGRAM = 'kg',
	PIECE = 'ea'
}

export enum ShopProductWeightUnit {
	CUSTOM = 'custom',
	KILOGRAM = 'kg'
}

export interface ShopProduct {
	id: number
	module: number
	name: string
	slug: string
	code: string
	EAN?: string
	frontpage: boolean
	description: string
	teaser: string
	legalInfo?: string
	image?: {
		src: string
		largeSrc: string
		alt: string
	}
	PDF?: {
		src: string
		name: string
		title: string
	}
	category: {
		id: number
		name: string
		slug: string
	}
	quantity: {
		value: number
		formatted: string
		unit: ShopProductQuantityUnit
	}
	weight: {
		value: number
		formatted: string
		unit: ShopProductWeightUnit
	}
	price: {
		value: number
		formatted: string
	}
	VAT: {
		value: number
		formatted: string
	}
	pricePerUnit: {
		value: number
		formatted: string
	}
}

export type ShopProducts = ShopProduct[]
