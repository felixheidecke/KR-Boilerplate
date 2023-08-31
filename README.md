# Patch Notes

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

### `AccordionSlide`

- Add up & down caret icons

### `Button`

- Simplify component types in
- Open external links in new tab
- Open PDF links in new tab

### `Link`

- Open PDF links in new tab

### `InView`

- Adding `fade-rtl` _(right to left)_ and `fade-ltr` _(left to right)_ transitions

### `Lightbox`

- Update styling of tiles in overview

### `Nav`

The current and active routes now are based on the current urls pathname. This negates the need to
passt `activeRoute` and `activeParent` as props

### `PageTransition`

- Prop `path` removed.

_(`width` is required for inline image with caption to work propperly)_

### XioniEventReistration

- Titles `<h4>` becomes `<h3>`
- Date font-size from small to default size
