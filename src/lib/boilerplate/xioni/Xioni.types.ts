export namespace Xioni {
	export interface Image {
		src: string
		alt: string
		align?: 'left' | 'right'
		srcset?: {
			small?: string
			medium?: string
			large?: string
		}
	}

	export interface PDF {
		src: string
		title: string
	}

	export type EventContext = {
		emitter: string
	}

	export namespace DetailLevel {
		export type Minimal = 'minimal'
		export type Basic = 'basic'
		export type Full = 'full'
		export type Extended = 'extended'
	}
}
