# \<XioniArticleTile /> (Component)

Event Kachel zur Darstellung mehrerer Events in eine Übersicht/Liste

| Parameter        | Typ            | Standard    | Beschreibung                      |
| ---------------- | -------------- | ----------- | --------------------------------- |
| `article`        | `XioniArticle` |             | Anzuzeigender Artikel             |
| `basePath`?      | `string`       |             | Dertail-Link Prefix               |
| `linkDelimiter`? | `string`       | `_`         | Trennzeichen zwischen Name und ID |
| `linkText`?      | `string`       | Weiterlesen | Dertail-Link Text                 |
| `class`?         | `string`       |             | CSS Klasse                        |

# \<XioniArticle /> (Component)

Volle Darstellung eines einzelnene Artikels

| Parameter | Typ            | Standard | Beschreibung          |
| --------- | -------------- | -------- | --------------------- |
| `article` | `XioniArticle` |          | Anzuzeigender Artikel |

# XioniArticleApi (Factory)

| Parameter | Typ            | Standard | Beschreibung       |
| --------- | -------------- | -------- | ------------------ |
| `fetch`   | `typeof fetch` | `fetch`  | XHR Fetch Function |

## XioniArticleApi.getMany (Method)

| Parameter       | Typ                    | Standard | Beschreibung                                   |
| --------------- | ---------------------- | -------- | ---------------------------------------------- |
| `module` (\*)   | `number \| string`     |          | Artikel Modul                                  |
| `filter`        | `object`               |          | Artikel filter                                 |
| `filter.full`   | `true`                 |          | Komplette Artikel Daten abrufen                |
| `filter.limit`  | `number`               |          | Abruf Limit                                    |
| `filter.status` | `'live' \| 'archived'` |          | Abruf nach Status (API liefert default 'live') |

## XioniArticleApi.getOne (Method)

| Parameter     | Typ                | Standard | Beschreibung              |
| ------------- | ------------------ | -------- | ------------------------- |
| `id` (\*)     | `number \| string` |          | Artikel ID                |
| `filter`      | `object`           |          | Artikel filter            |
| `filter.full` | `false`            |          | Nur Basis-Inhalte abrufen |

```JS
// --- [ Beispiel (+page.svelte) ] -----------------------------------------------------------------

import xioniArticleApi from '$lib/boilerplate/libraries/xioni/article'

const articleApi = xioniArticleApi()
let articles
let article

// Maximal 10 Artikel via getMany('modul')
articleApi
  .getMany(12345, { limit: 10})
  .then(response => articles = response)

// Einzelner Artikel via getOne('id')
articleApi
  .getOne(789)
  .then(response => article = response)


// --- [ Beispiel (+page.js) ] ---------------------------------------------------------------------

// Eg. /artikel/mein-artikel_999

import xioniArticleApi from '$lib/boilerplate/libraries/xioni/article'

export async function load({fetch, params}) {
  const articleApi = xioniArticleApi()

  return {
    events: await articleApi.getMany(12345, { limit: 10}),
    article: await articleApi.getOne(params.id) // ID 999 Ergibt sich aus URL
  }
}
```
