import type { XioniApiErrorResponse } from '$lib/boilerplate/xioni/types'
import type { Snippet } from 'svelte'

export interface FormProps {
	baseName?: string
	moduleId: number | string
	class?: string

	// Slots
	children?: Snippet
	done?: Snippet

	// Events
	successHandler?: () => void
	errorHandler?: (error: XioniApiErrorResponse) => void
}
