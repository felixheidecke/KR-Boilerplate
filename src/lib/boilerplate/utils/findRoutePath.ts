type Route = {
	path?: string
	name: string
	class?: string
	routes?: Route[]
	target?: '_blank'
}

function flattenRoutes(routes: Route[]) {
	const flattenedRoutes: Route[] = []

	routes.forEach(route => {
		flattenedRoutes.push(route)
		if (route.routes) {
			flattenedRoutes.push(...flattenRoutes(route.routes))
		}
	})

	return flattenedRoutes
}

export default function findRoutePath(routes: Route[], path: Route['path']) {
	const flattenedRoutes = flattenRoutes(routes)

	return flattenedRoutes.find(route => {
		if (route.path === '/') return false

		return route.path === path || path?.startsWith(route.path || '')
	})
}
