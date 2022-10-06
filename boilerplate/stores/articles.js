import { uniq, uniqBy, sortBy } from 'lodash-es'
import { writable, get } from 'svelte/store'
import { API_HOST } from '@/js/constants'
import buildUrl from '@/js/build-url'
import { hash } from '@/js/utils'
import { fetchJSON } from '@/js/fetch'

export const ARTICLES = writable([])
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

export const fetchArticles = async (id, options) => {
  // Unique key based on params
  const key = hash({ id, options })

  // Check if the URL has already been fetched
  if (get(GROUPS).includes(key)) return

  setLoading()

  try {
    const url = buildUrl(API_HOST, ['articles', id], options)
    const { data, status } = await fetchJSON(url)

    if (status >= 400) {
      setErrored()
      console.error(data)
      Promise.reject(data)
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

  setDone()
}

/**
 * Fetch an article from Xioni API
 * and write it to the store
 *
 * @param {number} id Xioni article id
 * @returns {Promise}
 */

export const fetchArticle = async (id) => {
  console.log('fetchArticle', id)

  if (get(ARTICLES).find((article) => article.id === id)) return

  setLoading()

  const url = buildUrl(API_HOST, `article/${id}`)
  const { data, status } = await fetchJSON(url)

  if (status >= 400) {
    setErrored()
    console.error(data)
    Promise.reject(data)
  }


  ARTICLES.update((articles) => {
    // Make sure to have no douplicates
    const update = uniqBy([data].concat(articles), 'id')
    return sortBy(update, 'date').reverse()
  })

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
