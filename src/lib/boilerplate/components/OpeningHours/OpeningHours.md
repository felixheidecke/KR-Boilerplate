# \<OpeningHours />

## Parameters

| Parameter          | Typ       | Standard | Beschreibung                             |
| ------------------ | --------- | -------- | ---------------------------------------- |
| `hours`            | `string`  |          | Anzuzeigende Veranstaltung               |
| `signOpen` (\*)    | `string`  |          | Bild das angezeigt wird wenn offen       |
| `signClosed` (\*)  | `string`  |          | Bild das angezeigt wird wenn geschlossen |
| `interactive` (\*) | `boolean` | `false`  | Links zu Öffnungszeiten                  |
| `class` (\*)       | `string`  |          | CSS Klasse                               |
| `exClass` (\*)     | `string`  |          | Exklusive CSS Klasse                     |

## HTML

```HTML
<OpeningHours
  hours="We-Fr 08:00-12:00, 15:00-18:00; Sa 08:00-12:00; PH off"
  signOpen="/images/we-are-open.png"
  signClosed="/images/we-are-closed.png"
/>
```

## CSS Classes

```SCSS
.OpeningHours {

  // --- Elements ---
  &__sign        { } // Das Schild
  &__distance    { } // Wir schließen in 10 Minuten
  &__next-change { } // Samstag um 12:00 Uhr
  &__trigger     { } // Link zum Modal

  // --- Modifier ---
  &--open   { } // Wenn geöffnet
  &--closed { } // Wenn geschlossen
}
```
