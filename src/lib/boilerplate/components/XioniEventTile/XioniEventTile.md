# \<XioniEventTile> (Component)

Event Kachel zur Darstellung mehrerer Events in eine Übersicht/Liste

| Parameter       | Typ          | Standard      | Beschreibung                              |
| --------------- | ------------ | ------------- | ----------------------------------------- |
| `event` (\*)    | `XioniEvent` |               | Veranstaltung (Siehe https://ogy.de/k4ya) |
| `basePath`      | `String`     |               | Dertail-Link Prefix                       |
| `linkDelimiter` | `String`     | `_`           | Trennzeichen zwischen Name und ID         |
| `linkText`      | `String`     | Mehr erfahren | Dertail-Link Text                         |
| `class`         | `String`     |               | CSS Klasse                                |

# \<XioniEvent> (Component)

Volle Darstellung eines einzelnene Events

| Parameter    | Typ          | Standard | Beschreibung                              |
| ------------ | ------------ | -------- | ----------------------------------------- |
| `event` (\*) | `XioniEvent` |          | Veranstaltung (Siehe https://ogy.de/k4ya) |

## Slots

keine

## Styles

```CSS
.XioniEventTile {
  &__image        {} /* Bild */
  &__title        {} /* Titel */
  &__date         {} /* Event Von-Bis-Datum */
  &__date-icon    {} /* Kalender Icon */
  &__description  {} /* HTML Beschreibung */
  &__link         {} /* Weiterlesen Link */
}
```
