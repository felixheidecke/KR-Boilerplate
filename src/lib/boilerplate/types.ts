export type Nullish = null | undefined

export type Falsy = false | 0 | '' | null | undefined | 'NaN'

export type Truthy = Exclude<any, Falsy>

export type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}
