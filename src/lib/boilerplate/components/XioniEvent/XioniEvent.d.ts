import type { Snippet } from 'svelte'

export interface XioniEventProps {
	baseName?: string
	event: XioniCMS.Event
	class?: string

	// Slots
	children?: Snippet

	// Events
	registrationClickHandler: () => void
}
