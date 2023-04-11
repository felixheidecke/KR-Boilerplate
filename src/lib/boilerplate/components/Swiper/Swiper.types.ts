export interface SwiperProps {
	autoplay?: number
	focusAt?: 'center' | number
	gap?: number
	images?: { src: string; alt: string }[]
	perView?: number
	speed?: number
	startAt?: number
	type?: 'slider' | 'carousel'
	nav?: boolean
	config?: object
	exClass?: string
}
