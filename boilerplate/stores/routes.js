import { readable } from 'svelte/store';
import { base } from '$app/paths';
import { isObject, omit, forEach } from 'lodash-es';

import routesYml from 'src/routes.yml';

const normalizeRoute = (routes) => {
  const normalRoutes = [];

  forEach(routes, (item, href) => {
    let route = {
      href,
      name: item,
      class: null,
      meta: null,
      icon: false,
      routes: []
    };

    if (href.indexOf('//')) {
      route.href = base + href
    }

    if (isObject(item)) {
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
