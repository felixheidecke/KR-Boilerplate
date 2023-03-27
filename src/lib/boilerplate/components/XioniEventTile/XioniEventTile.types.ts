import type { XioniEvent } from '$lib/boilerplate/libraries/xioni/event.types'
import type { Component } from '../component.types'

export interface XioniEventTileProps extends Component {
	basePath?: string
	event: XioniEvent
	linkDelimiter?: string
	linkText?: string
	tag?: string
}
