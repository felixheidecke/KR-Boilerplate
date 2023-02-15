export interface XioniEvent {
	id: number
	module: number
	slug: string
	title: string
	starts: Date
	ends: Date
	description: string
	details: string
	image: {
		src: string
		thumbSrc: string
		alt: string
	} | null
	pdf: {
		src: string
		name: string
		title: string
	} | null
	website: URL | null
	ticketshop: URL | null
	organizer: string
	coordinates?: {
		lat: number
		lng: number
	} | null
	images: {
		src: string
		alt: string
	}[]
	flags: string[]
}

export type XioniEvents = XioniEvent[]
