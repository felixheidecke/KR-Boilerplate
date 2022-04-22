import { responseHeader } from '../_defaults';
import { CACHE } from '../_constants';

export function get({ params }) {
  return {
    headers: {
      ...responseHeader,
      [CACHE.CONTROL]: CACHE.PUBLIC_1_DAY
    },
    body: {
      demo: true,
      myid: params.myid || null
    }
  };
}
