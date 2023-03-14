import type { Component } from '../component.types'

export enum YoutubePropsAllow {
	AUTOPLAY = 'autoplay',
	CLIPBOARD_WRITE = 'clipboard-write',
	ENCRYPTED_MEDIA = 'encrypted-media',
	PICTURE_IN_PICTURE = 'picture-in-picture'
}

export interface YoutubeProps extends Component {
	ratio: [number, number]
	videoId: string
	allow: YoutubePropsAllow[]
}
