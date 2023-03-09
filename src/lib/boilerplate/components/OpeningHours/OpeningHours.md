# \<OpeningHours>

## Parameters

| Parameter     | Typ       | Standard | Beschreibung                             |
| ------------- | --------- | -------- | ---------------------------------------- |
| `hours` (\*)  | `string`  |          | Anzuzeigende Veranstaltung               |
| `signOpen`    | `string`  |          | Bild das angezeigt wird wenn offen       |
| `signClosed`  | `string`  |          | Bild das angezeigt wird wenn geschlossen |
| `interactive` | `boolean` | `false`  | Links zu Öffnungszeiten                  |
| `class`       | `string`  |          | CSS Klasse                               |
| `exClass`     | `string`  |          | Exklusive CSS Klasse                     |

## CSS Classes

```SCSS
.OpeningHours {

  &__sign        { } // Das Schild
  &__distance    { } // Wir schließen in 10 Minuten
  &__next-change { } // Samstag um 12:00 Uhr
  &__trigger     { } // Link zum Modal

  &--open   { } // Wenn geöffnet
  &--closed { } // Wenn geschlossen
}
```
