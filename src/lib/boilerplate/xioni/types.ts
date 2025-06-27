export namespace XioniCMS {
	export interface Article {
		id: number
		module: number
		slug: string
		title: string
		date: Date | null
		teaser: string
		image: Image | null
		pdf: PDF | null
		website: URL | null
		author: string | null
		content?: ArticleContent[]
	}

	export interface ArticleContent {
		id: number
		title: string | null
		text: string | null
		image: Image | null
	}

	export interface Event {
		id: number
		module: number
		slug: string
		title: string
		teaser: string | null
		description: string | null
		address: string | null
		starts: Date
		ends: Date
		image: Image | null
		duration: string // Let's see if we can format this later
		pdf: PDF | null
		website: URL | null
		ticketshopURL: URL | null
		organizer: string | null
		coordinates: [number, number] | null
		images?: Image[]
		tags?: { id: number; name: string }[]
		flags?: string[]
	}

	export interface Album {
		id: number
		module: number
		slug: string
		title: string
		images?: Image[]
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

	export type AddressbookCategory = {
		id: number
		module: number
		priority: number
		title: string | null
		entries?: AddressbookEntry[]
	}

	export type AddressbookEntry = {
		id: number
		module: number
		title: string | null
		subtitle: string | null
		name: string | null
		room: string | null
		address: string | null
		city: string | null
		phone: string | null
		mobile: string | null
		fax: string | null
		email: string | null
		web: URL | null
		description: string | null
		priority: number
		image: Image | null
		keywords: string | null
	}
}

export interface Image {
	src: string
	description: string | null
	align: ('left' | 'right' | 'wide' | 'auto') | null
	srcset: {
		small?: string
	}
}

export interface PDF {
	src: string
	title?: string
}

export type XioniApiErrorResponse = {
	message: string
	details: Record<string, { message: string; code: string }[]>
}
