import { get, readable, writable } from 'svelte/store'
import { page } from '$app/stores'
import { routes } from '$lib/routes'
import type { Route, Routes } from './types'

const activeRoute = function () {
	const { subscribe, set } = writable(null as Route | null, function (set) {
		const route = (routes as Routes).find(({ path }) => get(page).url?.pathname === path)

		if (route) set(route)
	})

	function setActive(path: string): void {
		const route = routes.find((route: Route) => route.path === path)

		if (route) set(route)
	}

	return {
		subscribe,
		set: setActive,
		reset: () => set(null)
	}
}

export const ACTIVE_ROUTE = activeRoute()

export const ROUTES = readable(routes)
