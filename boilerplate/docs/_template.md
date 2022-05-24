### Code (Beispiel)

```HTML
<Element />
```

### Attribute

| Attribut   | Standard | Beschreibung |
| :--------- | :------- | :----------- |
| `bar` (\*) | `false`  | Ist Bar      |
| `foo` (1)  | `true`   | Ist Foo      |

1. Entfernt die jeweilge Hauptklasse und damit das default Styling

- (\*) Ist Verpflichtend

### Styling

```SCSS
.Element {

  // Modifier
  &.--foo {}

  // Elements
  .-bar {}
}
```

1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣
