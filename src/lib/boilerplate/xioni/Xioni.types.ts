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

	export type EventContext = {
		emitter: string
	}

	export enum DetailLevel {
		MINIMAL = 'minimal',
		BASIC = 'basic',
		FULL = 'full',
		EXTENDED = 'extended'
	}
}
