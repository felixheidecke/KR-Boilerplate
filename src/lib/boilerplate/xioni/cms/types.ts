import type { Xioni } from '../xioni.types'
import type { XioniFetchErrorResponse } from '../utils/xioniFetch'

export type XioniCMSData<T = unknown> = [T, undefined] | [undefined, XioniFetchErrorResponse]

export namespace XioniCMS {
	// --- [ Article ] -------------------------------------------------------------------------------

	export type Article = MinimalArticle | FullArticle | ExtendedArticle

	export interface MinimalArticle {
		id: number
		module: number
		slug: string
		title: string
		date: Date
	}

	export interface FullArticle extends MinimalArticle {
		text: string
		image?: Xioni.Image
		pdf?: Xioni.PDF
		website?: URL
		author?: string
	}

	export interface ExtendedArticle extends FullArticle {
		content?: {
			id: number
			text: string
			image?: Xioni.Image
		}[]
	}

	// --- [ Event ] ---------------------------------------------------------------------------------

	export type Event = Event.Minimal | Event.Basic | Event.Full

	export namespace Event {
		// Minimal Event data
		export interface Minimal {
			id: number
			module: number
			slug: string
			title: string
			starts: Date
			ends: Date
		}

		// Basic Event data
		export interface Basic extends Minimal {
			description: string
			details: string
			address: string
			image?: Xioni.Image
		}

		// Full Event data

		export interface Full extends Basic {
			pdf?: {
				src: string
				name: string
				title: string
			}
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
			flags?: 'Anmeldung'[]
		}
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
