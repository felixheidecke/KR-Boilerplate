import { readable } from 'svelte/store';
import { isObject, omit, forEach } from 'lodash-es';

import routesYml from 'src/routes.yml';

const normalizeRoute = (routes) => {
  const normalRoutes = [];

  forEach(routes, (item, href) => {
    let route;
    if (!isObject(item)) {
      route = { href, name: item, class: null, meta: null, icon: false, routes: [] };
    } else {
      route = {
        href,
        icon: item.icon,
        name: item.name,
        class: item.class || null,
        meta: item.meta || null,
        routes: normalizeRoute(omit(item, ['name', 'class', 'meta', 'icon']))
      };
    }
    normalRoutes.push(route);
  });

  return normalRoutes;
};

export const routes = readable(normalizeRoute(routesYml));

// export const activeRoute = writable();
