export enum InputPropsType {
	DATE = 'date',
	EMAIL = 'email',
	FILE = 'file',
	NUMBER = 'number',
	TEL = 'tel',
	TEXT = 'text'
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
