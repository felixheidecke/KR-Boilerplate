import { API_URL } from '@/js/constants'
import { fetchJSON } from '@/js/fetch'
import { uniqBy } from 'lodash-es'
import { get, writable } from 'svelte/store'

const GROUPS = writable([])

export const ALBUMS = writable([])
export const STATE = writable({
  isLoading: false,
  hasErrored: false
})

/**
 * Fetch a a gallery from Xioni API
 * and write it to the store
 *
 * @param {string|number} module Xioni module id
 * @param {boolean} force Force update
 * @returns {Promise<void>}
 */

export const fetchGallery = async (module, force = false) => {
  // Check if the Data has already been fetched
  if (get(GROUPS).includes(module) && !force) return

  setLoading()

  try {
    const url = [API_URL, 'gallery', module].join('/')
    const { data, status } = await fetchJSON(url)

    if (status >= 400) {
      setErrored()
      console.error(data)
      Promise.reject(data)
    }

    ALBUMS.update((gallery) => [...gallery, ...data])
    GROUPS.update((groups) => [...groups, module])
  } catch (e) {
    console.error(e)
  }

  setDone()
}

/**
 * Fetch a a gallery from Xioni API
 * and write it to the store
 *
 * @param {string | number} id Xioni module id
 * @param {boolean} force Force update
 * @returns {Promise<void>}
 */

export const fetchAlbum = async (id, force = false) => {
  if (get(ALBUMS).find((album) => album.id === id) && !force) return

  setLoading()

  try {
    const url = [API_URL, 'gallery', 'album', id].join('/')
    const { data, status } = await fetchJSON(url)

    if (status >= 400) {
      setErrored()
      console.error(data)
      Promise.reject(data)
    }

    ALBUMS.update((album) => {
      // Make sure to have no douplicates
      const update = uniqBy([data].concat(album), 'id')
      return update
    })
  } catch (e) {
    return new Error(e)
  }

  setDone()
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
