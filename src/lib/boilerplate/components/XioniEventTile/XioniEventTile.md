# \<XioniEventTile> (Component)

Event Kachel zur Darstellung mehrerer Events in eine Übersicht/Liste

| Parameter       | Typ          | Standard      | Beschreibung                      |
| --------------- | ------------ | ------------- | --------------------------------- |
| `event` (\*)    | `XioniEvent` |               | Anzuzeigende Veranstaltung        |
| `basePath`      | `String`     |               | Dertail-Link Prefix               |
| `linkDelimiter` | `String`     | `_`           | Trennzeichen zwischen Name und ID |
| `linkText`      | `String`     | Mehr erfahren | Dertail-Link Text                 |
| `class`         | `String`     |               | CSS Klasse                        |

# \<XioniEvent> (Component)

Volle Darstellung eines einzelnene Events

| Parameter    | Typ          | Standard | Beschreibung               |
| ------------ | ------------ | -------- | -------------------------- |
| `event` (\*) | `XioniEvent` |          | Anzuzeigende Veranstaltung |
