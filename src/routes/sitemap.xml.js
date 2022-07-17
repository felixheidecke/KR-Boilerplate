import { format } from 'date-fns';
import { ROUTES } from '@/stores/routes';
import { uniq } from 'lodash-es';

// --- Data ---------------------------

const hostname = 'http://rheingaueins.de';

let pages = [];

// --- Methods ------------------------

const createUrls = (routes) => {
  return routes.map((path) => {
    return `<url>
  <loc>${hostname + path}</loc>
  <lastmod>${format(new Date(), 'P')}</lastmod>
</url>`;
  });
};

// --- Subscriptions ------------------

ROUTES.subscribe((data) => {
  data.forEach(({ href, routes }) => {
    pages.push(href);

    if (routes.length) {
      pages.push(...routes.map((i) => i.href));
    }
  });

  pages = uniq(pages);
});

// --- Expose -------------------------

export async function get() {
  return {
    headers: {
      'Content-Type': 'application/xml'
    },
    body: [
      '<?xml version="1.0" encoding="UTF-8" ?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...createUrls(pages),
      '</urlset>'
    ].join('\n')
  };
}
