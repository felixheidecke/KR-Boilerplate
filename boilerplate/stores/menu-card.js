import { writable, get } from 'svelte/store'
import { API_HOST } from '@/js/constants'
import buildUrl from '@/js/build-url'

export const MENU_CARD = writable(new Map())
export const STATE = writable({
  isLoading: false,
  hasErrored: false
})

/**
 * Fetch a list of articles from Xioni API
 * and write it to the store
 *
 * @param {string | number} id Xioni customer id
 * @param {boolean} force Force update
 * @returns {Promise<void>}
 */

export const fetchMenuCard = async (id, force = false) => {
  // Check if the URL has already been fetched
  if (get(MENU_CARD).has(id) && !force) return

  setLoading()

  try {
    const url = buildUrl(API_HOST, ['menu-card', id])
    const res = await fetch(url)

    const contents = await res.json()

    if (!res.ok) {
      setErrored()
      console.error(res)
      Promise.reject(res)
    }

    MENU_CARD.update((menu) => {
      menu.set(id, contents)
      return menu
    })
  } catch (e) {
    console.error(e)
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
