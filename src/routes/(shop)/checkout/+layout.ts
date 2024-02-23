import { ORDER } from '../shopApi'

export function load() {
	ORDER.get()
}

export const prerender = false
export const ssr = false
