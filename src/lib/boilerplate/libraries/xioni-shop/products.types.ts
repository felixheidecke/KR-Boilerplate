export enum XioniShopProductQuantityUnit {
	LITER = 'l',
	KILOGRAM = 'kg',
	PIECE = 'ea'
}

export enum XioniShopProductWeightUnit {
	CUSTOM = 'custom',
	KILOGRAM = 'kg'
}

export interface XioniShopProduct {
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
		unit: XioniShopProductQuantityUnit
	}
	weight: {
		value: number
		formatted: string
		unit: XioniShopProductWeightUnit
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

export type XioniShopProducts = XioniShopProduct[]
