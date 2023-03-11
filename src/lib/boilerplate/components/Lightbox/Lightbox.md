# \<XioniEventTile>

Event Kachel zur Darstellung mehrerer Events in eine Übersicht/Liste

## Parameter

| Parameter | Typ                              | Beschreibung               |
| --------- | -------------------------------- | -------------------------- |
| `images`  | `{ src: string, alt: string }[]` | Bilder als Liste übergeben |
| `id`      | `String`                         | id                         |
| `class`   | `String`                         | CSS Klasse                 |

## Slots

`default`

## Styles

```CSS
.Lightbox {
  &__navigate        {}
  &__navigate--prev  {}
  &__navigate--next  {}
  &__textbox         {}
  &__active-image    {}
}
```
