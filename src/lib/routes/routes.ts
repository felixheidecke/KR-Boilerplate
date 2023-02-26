import routes from './routes.json'
import { MakeActiveRoute, MakeRoutes } from '$lib/boilerplate/libraries/make-routes/makeRoutes'

export const ROUTES = MakeRoutes(routes)

export const ACTIVE_ROUTE = MakeActiveRoute(routes)
