export interface XioniEvent {
	id: number
	module: number
	slug: string
	title: string
	starts: Date
	ends: Date
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
	organizer: string
	coordinates?: {
		lat: number
		lng: number
	}
	images: {
		src: string
		alt: string
	}[]
	flags: string[]
}
