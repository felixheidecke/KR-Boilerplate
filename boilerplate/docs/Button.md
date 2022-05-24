### Code (Beispiel)

```HTML
<Button icon="fab fa-apple">Text</Button>
```

### Attribute

| Attribute      | Standard | Beschreibung                |
| :------------- | :------- | :-------------------------- |
| `href` (1)     | `false`  | href Anker                  |
| `icon`         | `false`  | Icon                        |
| `disabled` (2) | `false`  | deaktiviert                 |
| `target` (2)   | `false`  | Anchor target               |
| `reverse` (3)  | `false`  | Elementreihenfolge umdrehen |

1. Macht aus dem `<button>` einen `<a>`
2. Funktioniert nur, wenn `href` gesetzt wurde.
3. Funktioniert nur, wenn mehrere Inhalte im Button zum einsatz kommen. Ggf. `icon`

### Styling

```SCSS
.Button {

  // Modifier
  &.--reverse {} // Wenn reverse
  &.--anchor {} // Wenn <a>

  // Elements
  .-icon {}
}
```
