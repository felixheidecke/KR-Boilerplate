import { base, assets } from '$app/paths';

export const isTrue = function (variable) {
  if (variable === 'false') return false;
  return !!variable;
};

export const assetPath = function (asset) {
  return `${assets}${asset}`;
};

export const basePath = function (link) {
  return `${base}${link}`;
};

export const scrollTo = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: `smooth`
  });
};

export const fetchJSON = async (url, params) => {
  if (params) {
    params = new URLSearchParams(params);
    url = `${url}?${params}`;
  }

  const res = await fetch(url);
  return await res.json();
};

export const formatEuro = (number) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });

  return formatter.format(number);
};

export const isExternalLink = (link) => {
  return !link.search(/(http(s)?|ftp):\/\//) || !link.indexOf('//')
};