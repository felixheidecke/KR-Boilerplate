# \<Address> (Component)

Anzeigen einer Anschrift

### Parameter

| Parameter     | Typ      | Standard | Beschreibung  |
| ------------- | -------- | -------- | ------------- |
| `name` (\*)   | `string` |          | Name          |
| `title`       | `string` |          | Titel         |
| `street` (\*) | `string` |          | Straße        |
| `town` (\*)   | `string` |          | Ort           |
| `phone`       | `string` |          | Telefon       |
| `email`       | `string` |          | Email Adresse |
| `web`         | `string` |          | Website       |
| `class`       | `string` |          | CSS Klasse    |

### Slots

`default`

### Styles

```CSS
.Address {
  &__name   {}
  &__title  {}
  &__street {}
  &__town   {}
  &__phone  {}
  &__email  {}
  &__web    {}
}
```
