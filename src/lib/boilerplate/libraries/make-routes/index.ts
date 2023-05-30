import { page } from '$app/stores'
import type { Route, Routes } from './types'
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

export function MakeParentRoute(routes: Routes, activeRoute: Readable<Route | null>) {
	return derived(activeRoute, ($activeRoute, set) => {
		if (!$activeRoute) return set(null)

		const parent = routes.find(route => {
			return route.routes?.includes($activeRoute)
		})

		set(parent as Route)
	}) as Readable<Route | null>
}
