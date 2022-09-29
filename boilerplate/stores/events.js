import { sortBy, uniq, uniqBy } from 'lodash-es'
import { get, writable } from 'svelte/store'
import { API_HOST } from '@/js/constants'
import buildUrl from '@/js/build-url'
import { hash } from '@/js/utils'

export const EVENTS = writable([])
export const SELECTED_EVENT = writable(null)
export const GROUPS = writable([])
export const STATE = writable({
  isLoading: false,
  hasErrored: false
})

/**
 * Fetch a list of articles from Xioni API
 * and write it to the store
 *
 * @param {string, number} moduleId Xioni customer id
 * @param {string, number} max maximum articles fetched
 * @returns {Promise}
 */

export const fetchEvents = async (id, options) => {
  // Unique key based on params
  const key = hash({ id, options })

  // Check if the URL has already been fetched
  if (get(GROUPS).includes(key)) return

  setLoading()

  try {
    const url = buildUrl(API_HOST, ['events', id], options)
    const res = await fetch(url)
    const contents = await res.json()

    if (!res.ok) {
      setErrored()
      console.error(res)
      Promise.reject(res)
    }

    EVENTS.update((events) => {
      const update = uniqBy(contents.concat(events), 'id')
      return sortBy(update, 'starts')
    })

    GROUPS.update((groups) => {
      const update = [...groups, key]
      return uniq(update)
    })
  }

  catch (e) {
    console.error(e)
  }

  setDone()
}

/**
 * Fetch an event from Xioni API
 * and write it to the store
 *
 * @param {string, number} moduleId Xioni event id
 * @returns {Promise}
 */

export const fetchEvent = async (id, force = false) => {
  if (get(EVENTS).find(event => event.id === id) && !force) return

  setLoading()

  const url = buildUrl(API_HOST, ['event', id])
  const res = await fetch(url)

  if (!res.ok) {
    setErrored()
    console.error(res)
    Promise.reject(res)
  }

  const content = await res.json()

  EVENTS.update((articles) => {
    // Make sure to have no douplicates
    const update = uniqBy([content].concat(articles), 'id')
    return sortBy(update, 'date').reverse()
  })

  setDone()
}

/**
 * Pick out a single event
 * 
 * @param {string | number} id Event id
 */

export const selectEvent = (id) => {
  const event = get(EVENTS).find((event) => +id === event.id) || null

  SELECTED_EVENT.set(event)
}

/**
 * Reset selected event
 */

export const resetSelection = () => {
  SELECTED_EVENT.set(null)
}

// --- Set STATE helper -----------

const setLoading = () => {
  STATE.set({
    isLoading: true,
    hasErrored: false
  })
}

const setErrored = () => {
  STATE.set({
    isLoading: false,
    hasErrored: true
  })
}

const setDone = () => {
  STATE.set({
    isLoading: false,
    hasErrored: false
  })
}