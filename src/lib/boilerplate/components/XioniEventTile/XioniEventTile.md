# \<XioniEventTile> (Component)

Event Kachel zur Darstellung mehrerer Events in eine Übersicht/Liste

| Parameter       | Typ          | Standard        | Beschreibung                              |
| --------------- | ------------ | --------------- | ----------------------------------------- |
| `basePath`      | `String`     |                 | Dertail-Link Prefix                       |
| `class`         | `String`     |                 | CSS Klasse                                |
| `id`            | `String`     |                 | HTML ID                                   |
| `event` (\*)    | `XioniEvent` |                 | Veranstaltung (Siehe https://ogy.de/k4ya) |
| `linkDelimiter` | `String`     | `_`             | Trennzeichen zwischen Name und ID         |
| `linkText`      | `String`     | `Mehr erfahren` | Dertail-Link Text                         |
| `tag`           | `String`     | `div`           | Äußerer HTML-Tag der Komponente           |

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
