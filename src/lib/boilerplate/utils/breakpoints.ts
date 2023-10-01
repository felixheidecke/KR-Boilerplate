import { browser } from '$app/environment'
import { readable } from 'svelte/store'

export const IS_MOBILE = readable(false, makeBreakpoint('(max-width: 640px)'))

export const IS_TABLET = readable(
	false,
	makeBreakpoint('(min-width: 641px) and (max-width: 1024px)')
)

export const IS_DESKTOP = readable(false, makeBreakpoint('(min-width: 1025px)'))

function makeBreakpoint(breakpoint: string) {
	return function (set: Function) {
		if (!browser) return

		const observer = window.matchMedia(breakpoint)
		const update = ({ matches }: { matches: boolean }) => set(matches)
		const stop = () => observer.removeEventListener('change', update)

		observer.addEventListener('change', update)

		set(observer.matches)

		return stop
	}
}
