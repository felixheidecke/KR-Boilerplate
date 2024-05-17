import { ORDER } from '../shop.api'

export function load() {
	ORDER.get()
}

export const prerender = false
export const ssr = false
