### Code (Beispiel)

Zeigt die Slider-Navigation an.

```HTML
<Nav variant="slide" />
```

Darstellung der `<Nav variant="slide" />` und `<Nav variant="bar" />` Navigation für verschiedene Breakpoints.

```HTML
<!-- Lange Fassung -->
<Nav breakpoint="1024px" />

<!-- Kurze Fassung -->
<Nav />
```

### Attribute

| Attribut         | Standard | Beschreibung                          |
| :--------------- | :------- | :------------------------------------ |
| `id`             | `-`      | Element ID                            |
| `class`          | `-`      | CSS Klasse _(zusätzlich)_             |
| `ex-class` (1)   | `-`      | CSS Klasse _(exklusiv)_               |
| `variant` (2)    | `-`      | Kann `slide` oder `bar` sein          |
| `breakpoint` (3) | `1024px` | Breakpoint zwischen `slide` und `bar` |

1. Entfernt die jeweilge Hauptklasse und damit das default Styling
2. Kann nicht zusammen mit `breakpoint` verwendet werden.
3. Kann nicht zusammen mit `variant` verwendet werden.

### Styling

```SCSS
.NavBar {
  &__ul             { }

  &__li             { }

  &__a              { }
  &__a--hover       { }
  &__a--active      { }

  &__ul-ul          { }
  &__ul-ul--visible { }

  &__li-li          { }

  &_a-a             { }
  &_a-a--hover      { }
  &_a-a--active     { }
}


.NavSlide {
  &__ul             { }

  &__li             { }

  &__a              { }
  &__a--hover       { }
  &__a--active      { }

  &__ul-ul          { }

  &__li-li          { }

  &_a-a             { }
  &_a-a--hover      { }
  &_a-a--active     { }
}

.Burger {
  &--active         { }
}
```
