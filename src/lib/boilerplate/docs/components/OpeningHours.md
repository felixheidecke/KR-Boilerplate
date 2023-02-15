## Markup

```HTML
<OpeningHours
  table="We-Fr 08:00-12:00, 15:00-18:00; Sa 08:00-12:00; PH off"
  signOpen="/images/we-are-open.png"
  signClosed="/images/we-are-closed.png"
/>
```

## Attribute

| Attribut     | Standard | Beschreibung                   |
| ------------ | -------- | ------------------------------ |
| `table`      | -        | Öffnungszeiten                 |
| `signOpen`   | -        | Pfad zum Bild wenn geöffnet    |
| `signClosed` | -        | Pfad zum Bild wenn geschlossen |

## Styling

```SCSS
.OpeningHours {

  // --- Elements ---------------------
  &__sign        { } // Das Schild
  &__distance    { } // Wir schließen in 10 Minuten
  &__next-change { } // Samstag um 12:00 Uhr

  // --- Modifier ---------------------
  &--open   { } // Wenn geöffnet
  &--closed { } // Wenn geschlossen
}
```
