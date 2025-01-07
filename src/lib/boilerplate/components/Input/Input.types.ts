export enum InputPropsType {
	TEXT = 'text',
	NUMBER = 'number',
	EMAIL = 'email',
	TEL = 'tel',
	FILE = 'file'
}

export interface InputProps {
	label: string
	max?: number
	min?: number
	name?: string
	placeholder?: string
	readonly?: boolean
	required?: boolean
	type?: InputPropsType
	value: string
	error?: string
	multiple?: boolean
}
