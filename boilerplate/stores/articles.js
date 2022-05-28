import { uniq, uniqBy, sortBy } from 'lodash-es';
import { writable } from 'svelte/store';

export const articles = writable([]);
export const groups = writable([]);
export const state = writable({
  isLoading: false,
  hasError: false
});

const BASE_URL = 'http://api.klickrhein.de:8300';

/**
 * Fetch a list of articles from Xioni API
 * and write it to the store
 *
 * @param {string, number} moduleId Xioni customer id
 * @param {string, number} max maximum articles fetched
 * @returns {Promise}
 */

export const fetchArticles = async (id, { limit = 100, expanded = false }) => {
  setLoading();

  const res = await fetch(`${BASE_URL}/articles/${id}?limit=${limit}&expanded=${expanded}`);

  if (!res.ok) {
    Promise.reject(res);
    return setError();
  }

  const contents = await res.json();

  articles.update((articles) => {
    // Make sure to have no douplicates
    const update = uniqBy(contents.concat(articles), 'id');
    return sortBy(update, 'date').reverse();
  });

  groups.update((groups) => {
    const update = [...groups, id];
    return uniq(update);
  });

  setDone();
};

/**
 * Fetch an article from Xioni API
 * and write it to the store
 *
 * @param {number} id Xioni article id
 * @returns {Promise}
 */

export const fetchArticle = async (id) => {
  setLoading();

  const res = await fetch(`${BASE_URL}/article/${id}`);

  if (!res.ok) {
    Promise.reject(res);
    return setError();
  }

  const content = await res.json();

  articles.update((articles) => {
    // Make sure to have no douplicates
    const update = uniqBy([content].concat(articles), 'id');
    return sortBy(update, 'date').reverse();
  });

  setDone();
};

// --- Set state helper -----------

const setLoading = () => {
  state.set({
    isLoading: true,
    hasError: false
  });
};

const setError = () => {
  state.set({
    isLoading: false,
    hasError: true
  });
};

const setDone = () => {
  state.set({
    isLoading: false,
    hasError: false
  });
};
