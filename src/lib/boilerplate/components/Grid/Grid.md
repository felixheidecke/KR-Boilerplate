# \<Grid>

Aufteilung in Spalten

## Parameter

| Parameter | Typ                 | Default | Beschreibung     |
| --------- | ------------------- | ------- | ---------------- |
| `tag`     | `string`            | `'div'` | HTML Tag         |
| `gap`     | `boolean \| 2 \| 3` | `false` | (Nur für Eltern) |
| `size`    | `string`            |         | (Nur für Kinder) |
| `id`      | `string`            |         |                  |
| `class`   | `string`            |         |                  |

## Slots

`default` für weitere Grids

## Styles

```SCSS
.Grid {
  &--gap      {}
  &--gap-2    {}
  &--gap-3    {}

  &__item     {}
  &__item-xyz {}
}
```
