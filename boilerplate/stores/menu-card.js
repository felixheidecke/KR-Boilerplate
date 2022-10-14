import { writable, get } from 'svelte/store'
import { API_URL } from '@/js/constants'
import { fetchJSON } from '@/js/fetch'

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
    const url = [API_URL, 'menu-card', id].join('/')
    const { data, status } = await fetchJSON(url)

    if (status >= 400) {
      setErrored()
      console.error(data)
      Promise.reject(data)
    }

    MENU_CARD.update((menu) => {
      menu.set(id, data)
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
