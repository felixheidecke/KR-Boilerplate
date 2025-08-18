export type ButtonProps = {
	class?: string
	baseName?: string
	children?: Snippet

	onClick?: Function

	variant?: 'primary' | 'secondary'
	disabled?: boolean
	fontello?: string
	isLoading?: boolean
	rel?: 'follow' | 'nofollow noopener'
	target?: '_blank'
	to?: string
}
