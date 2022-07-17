Listen (im ganzen oder pro Item) können mit [Font Awesome (Free Version 5)](https://fontawesome.com/icons?d=gallery&m=free) ausgerüstet werden.

Dabei müssen _alle_ FA Klassen mit eingetragen werden:

### Beispiel

```HTML
<!-- Alle Elemente mit dem selben Icon -->
<ul data-icon="fas fa-angle-double-right">
  <li>Lorem</li>
  <li>Ipsum</li>
</ul>

<!-- Elemente bekommen separates Icon -->
<ul>
  <li data-icon="far fa-file-word">Word-Dokument</li>
  <li data-icon="fas fa-file-pdf">PDF-Dokument</li>
</ul>
```

#### Hinweis

In der default.js muss folgende Zeile aktiviert sein:

```JS
require('scripts/font-awesome.js');
```
