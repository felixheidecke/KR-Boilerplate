import { isArray, forEach } from 'lodash-es'

/**
 *
 * @param {string} base Hostname
 * @param {string | string[]} path URL path
 * @param {object} params URL params
 * @returns
 */

export default function (base, path = '/', params = {}) {
  if (isArray(path)) {
    path = path.join('/')
  }

  const url = new URL(path, base)

  forEach(params, (value, key) => {
    if (isArray(value)) {
      value.forEach((val) => url.searchParams.append(key, val))
    } else {
      url.searchParams.append(key, value)
    }
  })

  return url
}
