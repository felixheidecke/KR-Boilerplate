import type { Snippet } from 'svelte'

export interface ModalProps {
	baseName?: string
	title?: string
	isOpen?: boolean
	class?: string

	// Slots
	children?: Snippet
	footer?: Snippet

	// Events
	closeHandler?: () => void
	openHandler?: () => void
}
