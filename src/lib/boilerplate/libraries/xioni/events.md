# XioniEventApi (Factory)

### Am Beispiel eine +page.js Datei

```JS
import XioniEventApi from '$lib/boilerplate/libraries/xioni/event'

export async function load({ fetch, params }) {
  const eventApi = XioniEventApi(fetch)

  // 10 Events aus 2023, die noch nicht abgelaufen sind.
  return {
    events: await eventApi.getMany(12345, {
      startsAfter: 2023,
      endsAfter: 'today',
      limit: 10
    })
  }
}
```

### Am Beispiel eine +page.svelte Datei (nicht emfohlen)

```JS
import XioniEventApi from '$lib/boilerplate/libraries/xioni/event'

let events
let event

const eventApi = XioniEventApi()
const setEvents = (data) => events = Object.freeze(data)
const setEvent = (data) => event = Object.freeze(data)

// 10 Events aus 2023, die noch nicht abgelaufen sind.
eventApi.getMany(12345, {
  startsAfter: 2023,
  endsAfter: 'today',
  limit: 10
}, setEvents)

// Einzelner Event via getOne('id')
eventApi.getOne(789, setEvent)
```
