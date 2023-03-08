# <XioniEventTile /> (Component)

Event Kachel zur Darstellung mehrerer Events in eine Übersicht/Liste

| Parameter        | Typ          | Standard      | Beschreibung                      |
| ---------------- | ------------ | ------------- | --------------------------------- |
| `event`          | `XioniEvent` |               | Anzuzeigende Veranstaltung        |
| `basePath`?      | `String`     |               | Dertail-Link Prefix               |
| `linkDelimiter`? | `String`     | `_`           | Trennzeichen zwischen Name und ID |
| `linkText`?      | `String`     | Mehr erfahren | Dertail-Link Text                 |
| `class`?         | `String`     |               | CSS Klasse                        |

# <XioniEvent /> (Component)

Volle Darstellung eines einzelnene Events

| Parameter | Typ          | Standard | Beschreibung               |
| --------- | ------------ | -------- | -------------------------- |
| `event`   | `XioniEvent` |          | Anzuzeigende Veranstaltung |

# XioniEventApi (Factory)

```JS
// --- [ Beispiel (+page.svelte) ] -----------------------------------------------------------------

import XioniEventApi from '$lib/boilerplate/libraries/xioni/event'

const eventApi = XioniEventApi()
let events
let event

// 10 Events aus 2023, die noch nicht abgelaufen sind via getMany('modul')
eventApi
  .getMany(12345, { startsAfter: 2023, endsAfter: 'today', limit: 10})
  .then(response => events = response)

// Einzelner Event via getOne('id')
eventApi
  .getOne(789)
  .then(response => event = response)


// --- [ Beispiel (+page.js) ] ---------------------------------------------------------------------

// Eg. /artikel/mein-artikel_999

import XioniEventApi from '$lib/boilerplate/libraries/xioni/event'

export async function load({fetch, params}) {
  const eventApi = XioniEventApi()

  return {
    events: await eventApi.getMany(12345, { startsAfter: 2023, endsAfter: 'today', limit: 10}),
    event: await eventApi.getOne(params.id) // ID 999 Ergibt sich aus URL
  }
}
```
