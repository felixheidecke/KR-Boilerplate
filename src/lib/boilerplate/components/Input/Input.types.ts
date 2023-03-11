export enum ImputPropsType {
	TEXT = 'text',
	NUMBER = 'number',
	EMAIL = 'email',
	TEL = 'tel'
}

export interface InputProps {
	label: string
	max?: number
	min?: number
	name?: string
	placeholder?: string
	readonly?: boolean
	required?: boolean
	type?: ImputPropsType
	value: string
}
