import type { Component } from '../component.types'

export enum PicturePropsLoading {
	LAZY = 'lazy',
	EAGER = 'eager'
}

export enum PicturePropsAlign {
	LEFT = 'left',
	RIGHT = 'right'
}

export interface PictureProps extends Component {
	src: string
	tablet?: string
	desktop?: string
	widescreen?: string
	alt?: string
	loading?: PicturePropsLoading
	align?: PicturePropsAlign
}
