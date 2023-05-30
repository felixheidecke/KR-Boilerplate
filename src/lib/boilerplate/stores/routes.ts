import routes from '$lib/../routes.js'
import {
	MakeActiveRoute,
	MakeParentRoute,
	MakeRoutes
} from '$lib/boilerplate/libraries/make-routes'

export const ROUTES = MakeRoutes(routes)

export const ACTIVE_ROUTE = MakeActiveRoute(routes)

export const ACTIVE_PARENT = MakeParentRoute(routes, ACTIVE_ROUTE)
