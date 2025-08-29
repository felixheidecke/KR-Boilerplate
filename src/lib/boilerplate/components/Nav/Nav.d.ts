import type { Snippet } from 'svelte'

export type NavProps = {
	class?: string
	children?: Snippet

	baseName?: string
	routes: NavRoute[]
	sticky?: boolean
}

type NavRoute = {
	path?: string
	name?: string
	class?: string
	routes?: Route[]
	target?: '_blank'
	title?: string
}
