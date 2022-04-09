import { writable } from 'svelte/store';

export const breakpoints = writable({
  mobile: false,

  tablet: false,
  'tablet-up': false,
  'tablet-down': false,

  desktop: false,
  'desktop-up': false,
  'desktop-down': false,

  widescreen: false
});
