export interface XioniAlbum {
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

export type XioniGallery = {
	id: number
	slug: string
	title: string
	sort: number
	photoCount: number
}[]
