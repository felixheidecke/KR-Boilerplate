export namespace XioniCMS {
	export interface Article {
		id: number
		module: number
		slug: string
		title: string
		teaser: string
		date: Date
		image?: Image
		pdf?: PDF
		website?: URL
		author?: string
		content?: {
			id: number
			title: string
			text: string
			image?: Image
		}[]
	}

	export interface Event {
		id: number
		module: number
		slug: string
		title: string
		starts: Date
		ends: Date
		duration: string
		teaser: string
		description: string
		image?: Image
		pdf?: PDF
		website?: URL
		ticketshop?: URL
		organizer?: string
		coordinates?: {
			lat: number
			lng: number
		}
		images?: {
			src: string
			alt: string
		}[]
		flags?: 'anmeldung'[]
	}

	export interface Album {
		id: number
		module: number
		slug: string
		title: string
		images: Image[]
	}

	export type Gallery = Album[]

	export interface MenuItem {
		id: number
		name: string
		description?: string
		image?: {
			src: string
			alt: string
		}
		price: {
			value: number
			formatted: string
		}
	}

	export interface MenuGroup {
		name: string
		description?: string
		items: MenuItem[]
	}

	export type MenuCard = MenuGroup[]
}

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
		pdf?: {
			src: string
			name: string
			title: string
		}
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
	alt: string
	align: 'left' | 'right'
	srcset: {
		small?: string
		medium?: string
		large?: string
	}
}

interface PDF {
	src: string
	name: string
	title: string
}
