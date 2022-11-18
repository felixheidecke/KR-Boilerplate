import { base, assets } from '$app/paths'

export const isTrue = function (variable) {
  if (variable === 'false') return false
  return !!variable
}

export const isFalse = (variable) => !isTrue(variable)

export const assetPath = function (asset) {
  return `${assets}${asset}`
}

export const basePath = function (link) {
  if (!link) return base

  return `${base}${link}`
}

export const scrollTo = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: `smooth`
  })
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

export const isInternalLink = (link) => !isExternalLink(link)

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

export const formToJson = (form) => {
  const formData = new FormData(form)
  return Object.fromEntries(formData)
}
