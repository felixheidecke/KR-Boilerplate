krNav### Beispiel:

**HTML**

```html
<nav class="kr-nav-main">
  <ul>
    <li><a href="#">First One</a></li>
    <li>
      <a class="-is-active" href="#">First Two</a>
      <ul>
        <li><a href="#">Second One</a></li>
        <li>
          <a href="#">Second Two</a>
          <ul>
            <li><a href="#">Third One</a></li>
            <li><a href="#">Third Two</a></li>
            <li><a href="#">Third Three</a></li>
          </ul>
        </li>
        <li><a href="#">Second Three</a></li>
      </ul>
    </li>
    <li><a href="#">First Three</a></li>
    <li><a href="#">First Four</a></li>
    <li><a href="#">First Five</a></li>
  </ul>
</nav>
```

**JS**

```js
require('scripts/js/nav.js')
requirejs(['jquery'], function ($) {
  $('.kr-nav-main').krNav()
})
```

---

#### Beispiel mit Option

```js
require('scripts/js/nav.js')
requirejs(['jquery'], function ($) {
  $('.kr-nav-main').krNav({
    sticky: true,
    slideSpeed: 'fast',
  })
})
```

### Optionen:

| Key           | Type    | Default          | Description                                  |
| ------------- | ------- | ---------------- | -------------------------------------------- |
| scroll        | Boolean | `true`           | Scolle zum Nav Anfang                        |
| scrollOffset  | Integer | `0`              | Distanz Endziel                              |
| scrollSpeed   | Integer | `600`            | Scrollgeschwindigkeit in Millisekunden       |
| slideSpeed    | String  | `'slow'`         | Geschwindigkeit mit der sich das Menü öffnet |
| activeClass   | String  | `'-is-active'`   | CSS Klasse für aktive Elemente               |
| expandedClass | String  | `'-is-expanded'` | CSS Klasse für die expandierte Navigation    |
| breakpoint    | Integer | `768`            | Breakpoint für den Wechseln zum Burger Menü  |
| sticky        | Boolean | `false`          | Fixe position der Nav am oberen Rand         |
| hideOnOffset  | Integer | `0`              | Ab `x` Scroll-Distanz verschwindet die Nav   |
