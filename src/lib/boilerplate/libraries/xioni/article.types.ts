export interface XioniArticle {
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

export type XioniArticles = XioniArticle[]
