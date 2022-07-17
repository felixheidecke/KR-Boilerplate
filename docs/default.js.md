## Vorwort

Die neue Boilerplate v1 läd alle externen Bibliotheken, Schriften und Icons vom KR-CDN. Dazu kommt vorranging [Require.js](https://requirejs.org/) zum Einsatz um diese Bibliotheken nur dann zu laden, wenn sie tatsächlich gebraucht werden.

# KR-Komponenten

Komponenten die ab und an in Projekten verwendet werden, können separat aktiviert und mit dem HTML Dokument verknüpft werden.

#### Beispiel:

```
1. require('scripts/demo.js');
2. cdn.require(['jquery']).then(() => {
3. 	$('.hier_ein_selector').krDemo();
});
```

#### Erklärung Zeile für Zeile:

1. Läd `krDemo` als jQuery Erweiterung
2. Läd die Bibliotheken `jquery` vom CDN
3. Führt `krDemo` am Element `<div class="hier_ein_selector">` aus. Kann über jeglichen Selektor angesteuert werden.

## Verfügbare KR-Komponenten

- krNav
- krScrollTo
- krShop
- krAkkordeon
- krForm
- krXioniNews

## Standard Komponenten

Gewissen KR-Komponenten werden immer geladen und aktiviert. Dazu gehören

- krLinkExternal
- krFileExternal
- krMailTo
- krToplink
- krBackground

# Externe Komponenten

Externe Komponenten kommen direkt über das CDN und können wie im folgenden Beispiel geladen und aktiviert werden.

#### Beispiel:

```JS
cdn.require(["jquery", "simplelightbox"]).then(() => {
	$('.gallery a').simpleLightbox({ /* options */ });
})
```
