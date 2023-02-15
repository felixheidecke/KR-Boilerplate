Die Boilerplate verfügt über vorgefertigte Komponenten. Diese sind wie folgt aufgebaut.

## Komponenten beginnen _immer_ mit einem Großbuchstaben

```HTML
<!-- HTML Tag -->
<h1>Hallo</h1>

<!-- Svelte Komponente -->
<Aspect>
```

## Komponenten können mit speziellen Attributen gesteuert werden

Diese Attribute sind für jede Komponente spezifisch.

```HTML
<!--
  Das Seitenverhältnis der <Aspekt /> Komponenten
  kann über das "ratio" Attribut gesteuert werden.
-->
<Aspect ratio="4:3">
```

## Der Klassenname entsprich dem Komponentennamen

Jede Komponente hat einen gleich lautenden Klassennamen entsprechend dem Komponentennamen.  
Bspw. kann `<Aspect />` über die `.Aspect` Klasse gestyled werden. `<Picture />` entspricht `.Picture` ect.  
Über diese Klassen wir das standard Styling der Komponente gesteuert. Das default Styling kann über das Attribut `ex-class` entfernt werden.

## Styling Grundlagen

Komponenten-Klassen sind nach dem [BEM Prinzip _(Block, Element and Modifier)_](http://getbem.com/introduction/) vergeben, um Namenskollisionen zu verhindern.

```CSS
.block__element--modifier { }
```

```HTML
<section class="foo">
  <div class="foo__item"> 😌 </div>
  <div class="foo__item"> 😴 </div>
  <div class="foo__item foo__item--active"> 😃 </div>
</section>
```

## ex-class für (fast) jede Komponente

Die standard Komponenten-Klasse kann durch die `ex-class` (auch _exclusive class_ genannt) **ersetzt** die, wodurch das standard-Styling komplett entfernt wird.

**Klassen verhalten**

```HTML
<!-- Svelte Input --------------------->

<Button>Button 1</Button>

<Button class="my-button">Button 2</Button>

<Button ex-class="my-button">Button 3</Button>

<!-- Entsprich diesem HTML Output ----->

<button class="Button">Button 1</button>

<button class="Button my-button">Button 2</button>

<button class="my-button">Button 3</button>
```
