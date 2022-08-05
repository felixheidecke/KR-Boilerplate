import { base, assets } from '$app/paths'

export const isTrue = function (variable) {
  if (variable === 'false') return false
  return !!variable
}

export const assetPath = function (asset) {
  return `${assets}${asset}`
}

export const basePath = function (link) {
  return `${base}${link}`
}

export const scrollTo = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: `smooth`
  })
}

export const fetchJSON = async (url, params) => {
  if (params) {
    params = new URLSearchParams(params)
    url = `${url}?${params}`
  }

  const res = await fetch(url)
  return await res.json()
}

export const formatEuro = (number) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  })

  return formatter.format(number)
}

export const isExternalLink = (link) => {
  return !link.search(/(http(s)?|ftp):\/\//) || !link.indexOf('//')
}

export const hash = (input) => {
  let hash = 0
  if (typeof input === 'object') {
    input = JSON.stringify(input)
  }

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash &= hash // Convert to 32bit integer
  }
  return new Uint32Array([hash])[0].toString(36)
}
