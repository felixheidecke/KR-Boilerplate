import { writable } from 'svelte/store'
import { page } from '$app/stores'
import normalizeRoutes from '@/js/normalize-routes'
import routes from 'src/routes.yml'

const { tree, flat } = normalizeRoutes(routes)

export const ROUTES = writable(tree)

export const ACTIVE_ROUTE = writable({})

export const SET_ACTIVE_ROUTE = (activeRoute) => {
  if (!activeRoute) {
    ACTIVE_ROUTE.set({})
    ROUTES.update((routes) => deactivateRouteInTree(routes))
    return
  }

  ACTIVE_ROUTE.set({
    ...activeRoute,
    isActive: true
  })

  ROUTES.update((routes) => activateRouteInTree(routes, activeRoute))
}

// --- Set initial route ----

export const INIT = () => {
  page.subscribe((page) => {
    const pathname = page.url.pathname
    const activeRoute = flat.find((route) => pathname === route.href)

    SET_ACTIVE_ROUTE(activeRoute)
  })
}

// --- Functions

const activateRouteInTree = (routes, activeRoute) => {
  return routes.map((route) => {
    return {
      ...route,
      isActive: route.href === activeRoute.href || route.href === activeRoute.parent,
      routes: route.routes.map((subroute) => {
        return {
          ...subroute,
          isActive: subroute.href === activeRoute.href
        }
      })
    }
  })
}

const deactivateRouteInTree = (routes) => {
  return routes.map((route) => {
    return {
      ...route,
      isActive: false,
      routes: route.routes.map((subroute) => {
        return {
          ...subroute,
          isActive: false
        }
      })
    }
  })
}
