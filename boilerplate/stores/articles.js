import { uniq, uniqBy, sortBy } from 'lodash-es';
import { writable } from 'svelte/store';

export const ARTICLES = writable([]);
export const GROUPS = writable([]);
export const STATE = writable({
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

export const FETCH_ARTICLES = async (id, { limit = 100, expanded = false }) => {
  setLoading();

  const res = await fetch(
    `${BASE_URL}/articles/${id}?limit=${limit}&expanded=${expanded}`
  );

  if (!res.ok) {
    Promise.reject(res);
    return setError();
  }

  const contents = await res.json();

  ARTICLES.update((articles) => {
    // Make sure to have no douplicates
    const update = uniqBy(contents.concat(articles), 'id');
    return sortBy(update, 'date').reverse();
  });

  GROUPS.update((groups) => {
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

export const FETCH_ARTICLE = async (id) => {
  setLoading();

  const res = await fetch(`${BASE_URL}/article/${id}`);

  if (!res.ok) {
    Promise.reject(res);
    return setError();
  }

  const content = await res.json();

  ARTICLES.update((articles) => {
    // Make sure to have no douplicates
    const update = uniqBy([content].concat(articles), 'id');
    return sortBy(update, 'date').reverse();
  });

  setDone();
};

// --- Set STATE helper -----------

const setLoading = () => {
  STATE.set({
    isLoading: true,
    hasError: false
  });
};

const setError = () => {
  STATE.set({
    isLoading: false,
    hasError: true
  });
};

const setDone = () => {
  STATE.set({
    isLoading: false,
    hasError: false
  });
};
