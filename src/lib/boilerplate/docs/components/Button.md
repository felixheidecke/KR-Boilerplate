## Markup

```HTML
<!-- 1 -->
<Button icon="fas fa-table" reverse>Öffnungszeiten Anzeigen</Button>

<!-- 2 -->
<Button to="//apple.com" icon="fab fa-apple">Zur Apple.com Website</Button>
```

## Attribute

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

## Styling

```SCSS
.Button {
  // --- Elements ---------------------
  &__icon {}

  // --- Modifier ---------------------
  &--reverse {} // Wenn ltr
}
```

## Output

Beispiel entsprechend dem Markup (siehe oben)

```HTML
<!-- 1 -->
<button class="Button Button--reverse">
  <i class="Button__icon fas fa-table" aria-hidden></i> Öffnungszeiten Anzeigen
</button>

<!-- 2 -->
<a href="//apple.com" class="Button">
  <i class="Button__icon fab fa-apple" aria-hidden></i> Zur Apple.com Website
</a>
```
