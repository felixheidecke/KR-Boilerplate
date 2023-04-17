import type { XioniGallery } from '$lib/boilerplate/libraries/xioni/gallery.types'
import type { Component } from '../component.types'

export interface XioniGalleryProps extends Component {
	gallery: XioniGallery
	basePath?: string
	linkDelimiter?: string
}