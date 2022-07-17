Buttons können mit [Font Awesome (Free Version 5)](https://fontawesome.com/icons?d=gallery&m=free) ausgerüstet werden.

Dabei müssen _alle_ FA Klassen mit eingetragen werden:

### Beispiel

```HTML
<!-- Alle Elemente mit dem selben Icon -->
<button data-icon="far fa-file-word">Word-Dokument</button>
<button data-icon="fas fa-file-pdf">PDF-Dokument</button>
```

#### Hinweis

In der default.js muss folgende Zeile aktiviert sein:

```JS
require('scripts/font-awesome.js');
```
