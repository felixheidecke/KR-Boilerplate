### Basis Setup:

```JS
require('scripts/js/scroll-to.js');
requirejs(['jquery'], function() {
	$('body').krScrollTo();
});
```

Das Script sucht, ausgehend vom angegebenen Selektor (in diesem Fall der `<body>`), Elemente mit dem `data-scroll-to` Attribut und scrollt zu den definierten Zielen.

#### Codebeispiel:

```HTML
<h1 id="headline">
	Headline
</h1>
<p>
	Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
</p>
<button data-scroll-to="#headline">Zurück zur Überschrift</button>
```

### Optionen

| Key    | Type    | Default | Description                      |
| ------ | ------- | ------- | -------------------------------- |
| offset | Integer | `0`     | Distanz der Endposition zum Ziel |
| speed  | Integer | `1`     | Geschwindigkeit                  |
