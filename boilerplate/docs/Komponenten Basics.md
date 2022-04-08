Die Boilerplate verfügt über vorgefertigte Komponenten. Diese sind wie folgt aufgebaut.

1. Komponenten beginnen _immer_ mit einem Großbuchstaben

```HTML
<!-- HTML Tag -->
<h1>Hallo</h1>

<!-- Svelte Komponente -->
<Aspect>
```

2. Komponenten können mit Attributen gesteuert werden

```HTML

<!--
  Das Seitenverhältnis der <Aspekt /> Komponenten
  kann über das "ratio" Attribut gesteuert werden.
-->
<Aspect ratio="4:3">
```

3. Der Klassenname entsproch dem Komponentenname

```HTML
<!-- Komponente -->
<Aspect />
<Picture src="bild.jpg">

<!-- Entspricht -->
<div class="Aspekt">[…]</div>
<picture class="Picture">[…]</picture>
```

4. Jede Boilerplate Komponente kann folgende Attribute erhalten

```HTML
<!-- "id" -->
<Picture id="my-image">

<!-- Entspricht -->
<picture class="Picture" id="my-image">[…]</picture>


<!-- "class" -->
<Picture class="my-image">

<!-- Entspricht -->
<picture class="Picture my-image" >[…]</picture>


<!-- "ex-class" (Exklusive Klasse) -->
<Picture ex-class>
<Picture ex-class="my-image">

<!-- Entspricht -->
<picture>[…]</picture>
<picture class="my-image" >[…]</picture>
```
