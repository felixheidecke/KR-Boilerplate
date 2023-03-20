import type { XioniEvent } from '$lib/boilerplate/libraries/xioni/event.types'

export interface XioniEventTileProps {
	tag?: string
	basePath?: string
	linkDelimiter?: string
	linkText?: string
	event: XioniEvent
}
