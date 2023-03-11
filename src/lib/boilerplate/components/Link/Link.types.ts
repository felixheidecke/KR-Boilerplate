export enum LinkPropsTarget {
	BLANK = '_blank'
}

export enum LinkPropsRel {
	NO_REFERRER = 'noreferrer',
	FOLLOW = 'follow'
}

export enum LinkPropsTag {
	ANCHOR = 'a',
	BUTTON = 'button'
}

export interface LinkProps {
	to: string
	target?: LinkPropsTarget
	icon?: string
	rel?: LinkPropsRel
	tag?: LinkPropsTag
}
