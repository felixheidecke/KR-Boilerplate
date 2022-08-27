import { forEach, omit } from 'lodash-es'

const normalizeRoutes = (routes, parent = null) => {
  let tree = []
  let flat = []

  forEach(routes, (item, href) => {
    const route = {
      href,
      name: item.name || item,
      class: item.class || null,
      meta: item.meta || null,
      isActive: false,
      parent,
      routes: []
    }

    flat = [...flat, route]

    if (item.name) {
      route.routes = normalizeRoutes(omit(item, ['name', 'class', 'meta']), href).flat
      flat = [...flat, ...route.routes]
    }

    tree = [...tree, route]
  })

  return { tree, flat }
}

export default normalizeRoutes
