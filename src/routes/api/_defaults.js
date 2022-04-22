import { CACHE } from './_constants';

export const responseHeader = {
  'X-Agency': 'Webseiten von klickrhein.de',
  'Content-Type': 'application/json',
  [CACHE.CONTROL]: CACHE.PRIVATE
};
