# \<Picture> (Component)

Darstellung von Bildern mit verschiedenene Größen und Auflösungen

## Parameters

| Parameter    | Typ                  | Standard | Beschreibung                      |
| ------------ | -------------------- | -------- | --------------------------------- |
| `src` (\*)   | `string`             |          | Pfad/URL zum Bild                 |
| `tablet`     | `string`             |          | Pfad/URL zum Bild (ab 621px)      |
| `desktop`    | `string`             |          | Pfad/URL zum Bild (ab 1025px)     |
| `widescreen` | `string`             |          | Pfad/URL zum Bild (ab 1441px)     |
| `alt`        | `string`             |          | Bild Beschreibung                 |
| `loading`    | `'lazy' \| 'eager'`  | `'lazy'` | Lade Verhalten                    |
| `align`      | `'left' \| 'right' ` |          | Trennzeichen zwischen Name und ID |
| `class`      | `String`             |          | CSS Klasse                        |

## Styling

```SCSS
.Picture {
  &--left   { } // Bild Ausrichtung Links
  &--right { } // Bild Ausrichtung Rechts
}
```
