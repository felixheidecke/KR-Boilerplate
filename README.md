# Patch Notes

## Version `4.11.2`

- Revert default `target="_self"` to undefined in `Button.svelte` & `Link.svelte`
- Remove superfluous rewrite condition form `.htaccess`

## Version `4.11.1`

- Bump Minor & Patch versions of dependencies
- Add `$routes` & `$stammdaten` aliases

### `AccordionSlide.svelte`

- Add up & down caret icons

### `Button.svelte`

- Simplify component types in
- Open external links in new tab
- Open PDF links in new tab

### `Link.svelte`

- Open PDF links in new tab

### `InView.svelte`

- Adding `fade-rtl` _(right to left)_ and `fade-ltr` _(left to right)_ transitions

### `Lightbox`

- Update styling of tiles in overview

### `Nav.svelte`

The current and active routes now are based on the current urls pathname. This negates the need to
passt `activeRoute` and `activeParent` as props

### `PageTransition.svelte`

- Prop `path` removed.

_(`width` is required for inline image with caption to work propperly)_

### XioniEventReistration.svelte

- Titles `<h4>` becomes `<h3>`
- Date font-size from small to default size
