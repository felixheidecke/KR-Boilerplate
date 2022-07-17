# ID

`id` setzt eine ID. (standard Verhalten)

```HTML
<!-- Eingabe -->
<Button id="foo" href="/">Drück mich</Button>

<!-- Resultat -->
<a id="foo" href="/">Drück mich</a>
```

# Klasse

`class` setzt eine zusätzliche CSS Klasse. (standard Verhalten)

```HTML
<!-- Eingabe -->
<Button href="/" class="my-button">Drück mich</Button>

<!-- Resultat -->
<a href="/" class="Button my-button">Drück mich</a>
```

# Exklusive Klasse

`ex-class` ersetzt die Hauptklasse (in diesem Fall `Button`).  
Damit wird auch das standard Styling des elements entfernt, da dieses an der Hauptklasse hängt.

```HTML
<!-- Eingabe -->
<Button href="/" ex-class="my-button">Drück mich</Button>

<!-- Resultat -->
<a href="/" class="my-button">Drück mich</a>
```
