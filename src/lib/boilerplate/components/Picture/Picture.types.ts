import type { Component } from '../component.types'

export interface PictureProps extends Component {
	src: string
	tablet?: string
	desktop?: string
	widescreen?: string
	alt: string
	loading: 'lazy' | 'eager'
	align?: 'left' | 'right'
}
