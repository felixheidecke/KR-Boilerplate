export type ButtonProps = {
	class?: string
	baseName?: string
	children?: Snippet

	disabled?: boolean
	fontello?: string
	isLoading?: boolean
	rel?: 'follow' | 'nofollow noopener'
	target?: '_blank'
	to?: string
}
