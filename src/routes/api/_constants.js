export const CACHE = {
  CONTROL: 'Cache-Control',
  PUBLIC_1_YEAR: 'public, max-age=' + 3600 * 24 * 360, // 360 days
  PUBLIC_1_QUARTER: 'public, max-age=' + 3600 * 24 * 90, // 90 days
  PUBLIC_30_DAYS: 'public, max-age=' + 3600 * 24 * 30, // 30 days
  PUBLIC_1_DAY: 'public, max-age=' + 3600 * 24, // 1 day
  PUBLIC_1_HOUR: 'public, max-age=' + 3600, // 1 hour
  PRIVATE: 'private, no-cache'
};
