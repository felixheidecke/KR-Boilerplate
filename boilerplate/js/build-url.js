import { isArray, forEach } from 'lodash-es'

export default function (base, path = '/', params = {}) {
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
