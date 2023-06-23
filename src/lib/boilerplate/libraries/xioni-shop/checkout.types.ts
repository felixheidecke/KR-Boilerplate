export enum XioniShopCheckoutOrderType {
	INVOICE = 'Rechnung',
	PREPAID = 'Vorkasse'
}

export interface XioniShopCheckoutOrder {
	type: XioniShopCheckoutOrderType
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
