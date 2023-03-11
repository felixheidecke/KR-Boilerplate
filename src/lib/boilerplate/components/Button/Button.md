# \<Button> (Component)

Einfach ein Button

### Parameter

| Parameter   | Typ                   | Standard | Beschreibung |
| ----------- | --------------------- | -------- | ------------ |
| `to`        | `string`              |          | Name         |
| `icon`      | `string`              |          | Titel        |
| `disabled`  | `boolean`             | `false`  | Straße       |
| `target`    | `'_blank' \| '_self'` |          | Ort          |
| `isLoading` | `boolean`             | `false`  | Telefon      |

### Slots

`default`

### Styles

```CSS
.Button {
  &__icon     {}
  &__text     {}

  &--ancor    {} /* Is ein <a> Tag */
  &--loading  {} /* Ist im lade zustand */
  &--disabled {} /* Ist deaktiviert */
}
```
