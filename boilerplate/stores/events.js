import { sortBy, uniq, uniqBy } from 'lodash-es'
import { writable } from 'svelte/store'

export const EVENTS = writable([])
export const GROUPS = writable([])
export const ERROR = writable(null)
export const STATE = writable({
  isLoading: false,
  hasError: false
})

/**
 * Fetch a list of articles from Xioni API
 * and write it to the store
 *
 * @param {string, number} moduleId Xioni customer id
 * @param {string, number} max maximum articles fetched
 * @returns {Promise}
 */

export const FETCH_EVENTS = async (uid, options) => {
  setLoading()

  const url = buildUrl(options)
  const res = await fetch(url)
  const contents = await res.json()

  if (!res.ok) {
    Promise.reject(res)
    return setError(contents)
  }

  EVENTS.update((events) => {
    const update = uniqBy(contents.concat(events), 'id')
    return sortBy(update, 'starts')
  })

  GROUPS.update((groups) => {
    const update = [...groups, uid]
    return uniq(update)
  })

  setDone()
}

const buildUrl = ({ module, commune, limit }) => {
  const url = new URL('http://api.klickrhein.de:8300/events')

  module?.forEach((id) => url.searchParams.append('module', id))

  commune?.forEach((id) => url.searchParams.append('commune', id))

  if (limit) url.searchParams.append('limit', limit)

  return url
}

// --- Set STATE helper -----------

const setLoading = () => {
  ERROR.set(null)
  STATE.set({
    isLoading: true,
    hasError: false
  })
}

const setError = (error) => {
  ERROR.set(error)
  STATE.set({
    isLoading: false,
    hasError: true
  })
}

const setDone = () => {
  ERROR.set(null)
  STATE.set({
    isLoading: false,
    hasError: false
  })
}
