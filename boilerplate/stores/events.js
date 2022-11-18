import { sortBy, uniq, uniqBy } from 'lodash-es'
import { get, writable } from 'svelte/store'
import { API_URL } from '@/js/constants'
import { hash } from '@/js/utils'
import { fetchJSON } from '@/js/fetch'

export const EVENTS = writable([])
export const SELECTED_EVENT = writable(null)
export const GROUPS = writable([])
export const IS_LOADING = writable(false)

/**
 * Fetch a list of articles from Xioni API
 * and write it to the store
 *
 * @param {string, number} moduleId Xioni customer id
 * @param {string, number} max maximum articles fetched
 * @returns {Promise}
 */

export const fetchEvents = async (id, params) => {
  // Unique key based on params
  const key = hash({ id, params })

  // Check if the URL has already been fetched
  if (get(GROUPS).includes(key)) return

  IS_LOADING.set(true)

  try {
    const url = [API_URL, 'events', id].join('/')
    const { data, status } = await fetchJSON(url, { params })

    if (status >= 400) {
      IS_LOADING.set(false)
      throw new Error(buildHttpErrorMessage(`fetching module ${id}`, status))
    }

    EVENTS.update((events) => {
      const update = uniqBy(data.concat(events), 'id')
      return sortBy(update, 'starts')
    })

    GROUPS.update((groups) => {
      const update = [...groups, key]
      return uniq(update)
    })
  } catch (error) {
    console.error(error)
  }

  IS_LOADING.set(false)
}

/**
 * Fetch an event from Xioni API
 * and write it to the store
 *
 * @param {string, number} moduleId Xioni event id
 * @returns {Promise}
 */

export const fetchEvent = async (id, force = false) => {
  if (get(EVENTS).find((event) => event.id === id) && !force) return

  IS_LOADING.set(true)

  try {
    const url = [API_URL, 'event', id].join('/')
    const { data, status } = await fetchJSON(url)

    if (status >= 400) {
      IS_LOADING.set(false)
      throw new Error(buildHttpErrorMessage(`fetching id ${id}`, status))
    }

    EVENTS.update((articles) => {
      // Make sure to have no douplicates
      const update = uniqBy([data].concat(articles), 'id')
      return sortBy(update, 'date').reverse()
    })
  } catch (error) {
    console.error(error)
  }

  IS_LOADING.set(false)
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
