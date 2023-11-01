import type { XioniFetchErrorResponse } from '../xioni-fetch/types'

export type XioniResponse<T = unknown> = [T, undefined] | [undefined, XioniFetchErrorResponse]

export namespace XioniCMS {
	export interface Article {
		id: number
		module: number
		slug: string
		title: string
		date: Date
		text: string
		image?: {
			src: string
			thumbSrc: string
			alt: string
		}
		pdf?: {
			src: string
			name: string
			title: string
		}
		website?: URL
		author?: string
		content?: {
			text: string
			image?: {
				src: string
				alt: string
				align: 'left' | 'right'
			}
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
		image?: {
			src: string
			thumbSrc: string
			alt: string
		}
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

	export interface Album {
		id: number
		module: number
		slug: string
		title: string
		order: number
		photos: {
			src: string
			thumbSrc: string
			alt: string
			order: number
		}[]
	}

	export type Gallery = {
		id: number
		slug: string
		title: string
		sort: number
		photoCount: number
	}[]

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
