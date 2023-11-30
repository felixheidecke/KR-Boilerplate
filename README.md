# Patch Notes

## Version `4.14.4`

- Move `og-image.jpg` to `_meta` folder
- Prettier ignores `app.html`

## Version `4.14.3`

- Allow for `target: "_blank"` in `route.js`
- Update Dependencies

## Version `4.14.2`

- Introduce _kr-stylebox_ to replace internal styles

## Version `4.14.1`

- Minor folder restructuring

## Version `4.14.0`

- Remove info.json (will be replaced)
- Add CDN Support
- Create new project `config.js`

## Version `4.13.0`

- Use line-clamp in headline and paragraph defaults
- Update Modal to use `<dialog>`
- Minor components updates pulled from `develop/5` branch

## Version `4.12.4`

- Remove unused store implementation
- Update Dependencies

## Version `4.12.3`

- Remove unused Axios lib
- Update dependencies

## Version `4.12.2`

- Add `width`, `height` & `placeholder` props to `Picture` component
- Add `placeholder` prop to `Figure` component
- Minor improvements

## Version `4.12.1`

- Fix apple-touch-icon.png name
- Fix not centered figcaption

## Version `4.12.0`

- Update Dependencies
- Larger favicons update (app.html)
- Add `Figure` Component
- Update `InView` transition speeds
- Add `Container` component
- Remove `ex-class` propperty from `XioniArticle` and `XioniArticleTile` components
- Remove `MakeRoutes` Library
- Remove `routes.ts` Store
- Update list styles
- Add `xioniLoader` helper
- Append http status code to erroring pages url (`+error.svelte` & `.htaccess`)

## Version `4.11.2`

- Revert default `target="_self"` to undefined in `Button` & `Link`
- Remove superfluous rewrite condition form `.htaccess`

## Version `4.11.1`

- Bump Minor & Patch versions of dependencies
- Add `$routes` & `$stammdaten` aliases

---

# Update Guide

Replace the following files and folders upon updating:

### Folder

- `/src/lib/boilerplate/`

### Files

- `/src/lib/config.js`
- `/src/app.html`
- `/README.md`
- `/package-lock.json`
- `/package.json`
- `/svelte.config.js`
- `/tsconfig.json`
- `/vite.config.js`
