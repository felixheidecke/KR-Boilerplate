import { CACHE } from './_constants';
import { responseHeader } from './_defaults';

export function get() {
  return {
    headers: {
      ...responseHeader,
      [CACHE.CONTROL]: CACHE.PUBLIC_1_QUARTER
    },
    body: {
      message: 'Willkommen bei der Klickrhein API',
      docs: 'https://github.com/felixheidecke/KR-Boilerplate/wiki'
    }
  };
}
