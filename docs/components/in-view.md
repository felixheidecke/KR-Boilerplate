HTML Elemente die eine Klassenamen haben die mit `animation-` beginnt, bekommen zusätzlich die Klasse `is-visible` angehängt sobald diese im Viewport sind. Diese Klasse wird wieder entfernt, wenn das Element aus dem Viewport verschwindet.

### Beispiel:

**HTML**

```html
<!-- Ausserhalb des Viewports -->
<div class="animation-fade"></div>

<!-- Im Viewport -->
<div class="animation-fade is-visible"></div>
```
