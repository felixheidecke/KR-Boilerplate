import { page } from '$app/stores'
import type { Route, Routes } from '$lib/routes/routes.types'
import { derived, readable, type Readable } from 'svelte/store'

export function MakeRoutes(routes: Routes) {
	return readable(routes)
}

export function MakeActiveRoute(routes: Routes) {
	const flatRoutes = [...routes]

	routes.forEach(({ routes }) => {
		if (routes) {
			flatRoutes.push(...routes)
		}
	})

	return derived(page, ($page, set) => {
		const activeRoute = flatRoutes.find(({ path }) => $page.url?.pathname === path) || null

		set(activeRoute as Route | null)
	}) as Readable<Route | null>
}
