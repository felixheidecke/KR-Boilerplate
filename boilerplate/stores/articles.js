import { uniq, uniqBy } from 'lodash-es';
import { writable } from 'svelte/store';
import { marked } from 'marked';
import slugify from 'slugify';

export const articles = writable([]);
export const groups = writable([]);
export const state = writable({
  isLoading: false,
  hasError: false
});

/**
 * Fetch a list of articles from Xioni API
 * and write it to the store
 *
 * @param {string, number} moduleId Xioni customer id
 * @param {string, number} max maximum articles fetched
 * @returns {Promise}
 */

export const fetchArticles = async (moduleId, max = 25) => {
  state.set({ isLoading: true, hasError: false });

  const res = await fetch(`https://api.klickrhein.de/v2/articles/?${moduleId}&max=${max}`);

  if (!res.ok) {
    state.set({ isLoading: false, hasError: true });
    return Promise.reject(res);
  }

  const text = await res.json();
  const contents = text.map((article) => restructure(article));

  articles.update((a) => uniqBy(a.concat(contents), 'id'));

  // write module id to groups,
  // so we know it has been fetched
  groups.update((g) => uniq([...g, moduleId]));

  state.set({ isLoading: false, hasError: false });
};

/**
 * Fetch an article from Xioni API
 * and write it to the store
 *
 * @param {string, number} articleId Xioni article id
 * @returns {Promise}
 */

export const fetchArticle = async (articleId) => {
  const res = await fetch(`https://api.klickrhein.de/v2/article/?${+articleId}`);

  if (!res.ok) return Promise.reject(res);

  const text = await res.json();
  articles.update((a) => uniqBy([...a, restructure(text)], 'id'));
};

/**
 *
 * @param {object} article structure
 * @returns {object} restructured
 */

const restructure = function ({
  id,
  module,
  date,
  author,
  title,
  image,
  imageSmall,
  imageDescription,
  pdf,
  pdfName,
  pdfTitle,
  text,
  paragraphs
}) {
  const root = 'https://www.rheingau.de/data/';

  return {
    id: +id,
    module: +module,
    slug: slugify(`${id}-${title}`, { lower: true }),
    date: +date * 1000,
    author,
    title,
    image: image
      ? {
          src: root + image,
          srcSmall: root + imageSmall,
          alt: imageDescription
        }
      : null,
    pdf: pdf
      ? {
          src: root + pdf,
          name: pdfName,
          title: pdfTitle || pdfName
        }
      : null,
    text: text ? marked.parse(text.trim()) : null,
    content: paragraphs.map((p) => {
      return {
        image: p.image
          ? {
              src: root + p.image,
              alt: p.imageDescription
            }
          : null,
        text: p.text ? marked.parse(p.text.trim()) : null
      };
    })
  };
};
