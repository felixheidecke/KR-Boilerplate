export interface XioniMenuItem {
	id: number
	name: string
	description?: string
	image?: { src: string; alt: string }
	price: number
}

export interface XioniMenuGroup {
	name: string
	description?: string
	items: XioniMenuItem[]
}

export type XioniMenuCard = XioniMenuGroup[]
