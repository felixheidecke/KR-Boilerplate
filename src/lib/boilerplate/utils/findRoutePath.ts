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

function sortRoutesByLength(routes: Route[]) {
	return routes.sort((a, b) => (b.path || '').length - (a.path || '').length)
}

export default function findRoutePath(routes: Route[], path: Route['path']) {
	const flattenedRoutes = flattenRoutes(routes)
	const sortedRoutes = sortRoutesByLength(flattenedRoutes)

	return sortedRoutes.find(
		route => route.path === path || (path?.startsWith(route.path || '') && route.path !== '/')
	)
}
