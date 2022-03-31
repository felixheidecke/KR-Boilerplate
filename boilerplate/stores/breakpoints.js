import { writable } from 'svelte/store';

export const breakpoints = writable({
  MOBILE: false,
  TABLET: false,
  DESKTOP: false,
  WIDESCREEN: false
});
