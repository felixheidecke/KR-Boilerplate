import { uniq, uniqBy } from 'lodash-es';
import { writable } from 'svelte/store';
import structuring from './structuring';

export const articles = writable([]);
export const groups = writable([]);

export const fetchArticles = async (moduleId) => {
  const res = fetch(`https://api.klickrhein.de/v2/articles/?${moduleId}&max=10`);

  if (!res.ok) return Promise.reject(res);

  const text = await res.json();
  const contents = text.map((article) => structuring(article));
  articles.update((a) => uniqBy(a.concat(contents), 'id'));
  groups.update((g) => uniq([...g, moduleId]));
};

export const fetchArticle = async (articleId) => {
  const res = fetch(`https://api.klickrhein.de/v2/article/?${+articleId}`);

  if (!res.ok) return Promise.reject(res);

  const text = await res.json();
  articles.update((a) => uniqBy([...a, structuring(text)], 'id'));
};
