export namespace Xioni {
	export interface Image {
		src: string
		alt: string
		align: 'left' | 'right'
		srcset: {
			small?: string
			medium?: string
			large?: string
		}
	}

	export interface PDF {
		src: string
		name: string
		title: string
	}
}
