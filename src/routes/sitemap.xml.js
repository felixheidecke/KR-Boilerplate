import routes from 'src/routes.yml';
import { format } from 'date-fns';

const hostname = 'http://rheingaueins.de';

const createUrls = (routes) => {
  return Object.keys(routes).map((route) => {
    return `<url>
  <loc>${hostname + route}</loc>
  <lastmod>${format(new Date(), 'P')}</lastmod>
</url>`;
  });
};

export async function get() {
  return {
    headers: {
      'Content-Type': 'application/xml'
    },
    body: [
      '<?xml version="1.0" encoding="UTF-8" ?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...createUrls(routes),
      '</urlset>'
    ].join('\n')
  };
}
