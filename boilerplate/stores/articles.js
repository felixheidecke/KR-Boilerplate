import { uniq, uniqBy, sortBy } from 'lodash-es'
import { writable, get } from 'svelte/store'
import { API_URL } from '@/js/constants'
import { hash } from '@/js/utils'
import { fetchJSON } from '@/js/fetch'
import { buildHttpErrorMessage } from '@/js/utils/build-message'

export const ARTICLES = writable([])
export const GROUPS = writable([])
export const STATE = writable({ loading: false })

/**
 * Fetch a list of articles from Xioni API
 * and write it to the store
 *
 * @param {string, number} moduleId Xioni customer id
 * @param {string, number} max maximum articles fetched
 * @returns {Promise}
 */

export const fetchArticles = async (id, params) => {
  // Unique key based on params
  const key = hash({ id, params })

  // Check if the URL has already been fetched
  if (get(GROUPS).includes(key)) return

  STATE.set({ loading: true })

  try {
    const url = [API_URL, 'articles', id].join('/')
    const { data, status } = await fetchJSON(url, { params })

    if (status >= 400) {
      STATE.set({ loading: false })
      throw new Error(buildHttpErrorMessage(`fetching module ${id}`, status))
    }

    ARTICLES.update((articles) => {
      // Make sure to have no douplicates
      const update = uniqBy(data.concat(articles), 'id')
      return sortBy(update, 'date').reverse()
    })

    GROUPS.update((groups) => {
      const update = [...groups, key]
      return uniq(update)
    })
  } catch (error) {
    console.error(error)
  }

  STATE.set({ loading: false })
}

/**
 * Fetch an article from Xioni API
 * and write it to the store
 *
 * @param {number} id Xioni article id
 * @returns {Promise}
 */

export const fetchArticle = async (id) => {
  if (get(ARTICLES).find((article) => article.id === id)) return

  STATE.set({ loading: true })

  try {
    const url = [API_URL, 'article', id].join('/')
    const { data, status } = await fetchJSON(url)

    if (status >= 400) {
      STATE.set({ loading: false })
      throw new Error(buildHttpErrorMessage(`fetching id ${id}`, status))
    }

    ARTICLES.update((articles) => {
      // Make sure to have no douplicates
      const update = uniqBy([data].concat(articles), 'id')
      return sortBy(update, 'date').reverse()
    })
  } catch (error) {
    console.error(error)
  }

  STATE.set({ loading: false })
}
