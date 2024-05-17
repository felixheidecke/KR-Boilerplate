import type { Xioni } from '../xioni.types'
import type { XioniFetchErrorResponse } from '../utils/xioniFetch'

export type XioniCMSData<T = unknown> = [T, undefined] | [undefined, XioniFetchErrorResponse]

export namespace XioniCMS {
	export interface Article {
		id: number
		module: number
		slug: string
		title: string
		date: Date
		text: string
		image?: Xioni.Image
		pdf?: Xioni.PDF
		website?: URL
		author?: string
		content?: {
			id: number
			title: string
			text: string
			image?: Xioni.Image
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
		description: string
		details: string
		image?: Xioni.Image
		pdf?: Xioni.PDF
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
		images: Xioni.Image[]
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
