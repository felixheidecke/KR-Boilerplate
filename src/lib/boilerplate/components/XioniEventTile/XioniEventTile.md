# <XioniEventTile /> (Component)

Event Kachel zur Darstellung mehrerer Events in eine Übersicht/Liste

| Parameter            | Typ          | Standard      | Beschreibung                      |
| -------------------- | ------------ | ------------- | --------------------------------- |
| `event`              | `XioniEvent` |               | Anzuzeigende Veranstaltung        |
| `basePath` (\*)      | `String`     |               | Dertail-Link Prefix               |
| `linkDelimiter` (\*) | `String`     | `_`           | Trennzeichen zwischen Name und ID |
| `linkText` (\*)      | `String`     | Mehr erfahren | Dertail-Link Text                 |
| `class` (\*)         | `String`     |               | CSS Klasse                        |

# <XioniEvent /> (Component)

Volle Darstellung eines einzelnene Events

| Parameter | Typ          | Standard | Beschreibung               |
| --------- | ------------ | -------- | -------------------------- |
| `event`   | `XioniEvent` |          | Anzuzeigende Veranstaltung |

# XioniEventApi (Factory)

```JS
// --- [ Beispiel (+page.svelte) ] -----------------------------------------------------------------

import XioniEventApi from '$lib/boilerplate/libraries/xioni/event'

// 10 Events aus 2023, die noch nicht abgelaufen sind.
const getEvents = XioniEventApi().getMany
const eventsModule = 12345
const eventsConfig = 	{
		startsAfter: 2023,
		endsAfter: 'today',
		limit: 10
}

let events

getEvents(eventsModule, eventsConfig).then((data) => (events = data))


// Einzelner Event via getOne('id')
eventApi
  .getOne(789)
  .then(data => event = data)


// --- [ Beispiel (+page.js) ] ---------------------------------------------------------------------

import XioniEventApi from '$lib/boilerplate/libraries/xioni/event'

export async function load({ fetch, params }) {
  const getEvents = XioniEventApi(fetch).getMany
  const eventsModule = 12345
  const eventsConfig = 	{
      startsAfter: 2023,
      endsAfter: 'today',
      limit: 10
  }

  return {
    events: await getEvents(eventsModule, eventsConfig)
  }
}
```
