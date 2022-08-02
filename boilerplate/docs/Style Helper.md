CSS Helper Klassen

(a) Helperklassen können an allen HTML Elementen (\<div\>, \<a\>, \<h1\>, ect.) und allen Komponenten (\<Aspect\>, \<Mail\>, …) verwendet werden.

(b.) Helper beginnen immer mit einem `$` um diese sehr einfach als Helper zu erkennen.

(c.) Viele helper können für bestimmte Vi

```HTML
<!-- Margin top von 0.5rem auf Desktop -->
<div class="$mt-1/2@desktop" />

<!-- Margin top & bottom von 6rem auf Tablet -->
<div class="$my-6@tablet" />
```
