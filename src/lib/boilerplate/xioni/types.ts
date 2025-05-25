export namespace XioniCMS {
	export interface Article {
		id: number
		module: number
		slug: string
		title: string
		date: Date
		teaser: string
		image?: Image | null
		pdf?: PDF | null
		website?: URL | null
		author?: string | null
		content?: ArticleContent[]
	}

	export interface ArticleContent {
		id: number
		title?: string | null
		text?: string | null
		image?: Image | null
	}

	export interface Event {
		id: number
		module: number
		slug: string
		title: string
		teaser?: string
		description?: string | null
		address?: string | null
		starts: Date
		ends: Date
		image?: Image | null
		duration: string
		pdf?: PDF | null
		website?: URL
		ticketshopURL?: URL
		organizer?: string | null
		coordinates?: [number, number] | null
		tags?: {
			id: number
			name: string
		}[]
		flags?: 'anmeldung'[]
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
}

interface Image {
	src: string
	description?: string | null
	align?: ('left' | 'right' | 'wide' | 'auto') | null
	srcset?: {
		small?: string
	}
}

interface PDF {
	src: string
	title?: string
}

export type XioniApiErrorResponse = {
	message: string
	details: Record<string, { message: string; code: string }[]>
}
