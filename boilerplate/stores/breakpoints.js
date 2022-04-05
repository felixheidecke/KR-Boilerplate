import { writable } from 'svelte/store';

export const breakpoints = writable({
  MOBILE: false,

  TABLET: false,
  TABLET_UP: false,
  TABLET_DOWN: false,

  DESKTOP: false,
  DESKTOP_UP: false,
  DESKTOP_DOWN: false,

  WIDESCREEN: false
});
