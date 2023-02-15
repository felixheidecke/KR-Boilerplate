export interface XioniShopInfo {
	name: string
	web: URL
	email: string
	phone: string
	address: string
	city: string
	zip: string
	shipping: XioniShopInfoShipping
}

export interface XioniShopInfoShipping {
	description: string
	rates: {
		weight: { value: number; formatted: string }
		price: { value: number; formatted: string }
	}
}
