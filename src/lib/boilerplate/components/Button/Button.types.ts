import type { Component } from '../component.types'

export enum ButtonPropsTarget {
	BLANK = '_blank'
}

export interface ButtonProps extends Component {
	to?: string
	icon?: string
	disabled?: boolean
	target?: ButtonPropsTarget
	isLoading?: boolean
}
