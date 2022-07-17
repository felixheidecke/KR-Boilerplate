KR Komponenten (als auch externe) unterteilen sich in globale und Element-spezifische Komponenten.

## Globale Komponenten

Werden auf das zu durchsuchende Objekt angewendet (In der Regel `$(body)`) und finden vom Element ausgehenden DOM-Tree nach passenden Nodes.

#### Beispiele:

- **kr-mailto** sucht nach dem Selektoren Schema `*[data-mailto]` und häftet sich an jedes dieser Vorkommen.
- **kr-link-external** sucht u. a. nach dem Selektoren Schema `'a[href*="://"]'` und häftet sich an jedes dieser Vorkommen.

## Spezifische Komponenten

Werden auf ein spezifisches Element angewendet.

#### Beispiel:

- **kr-form** wird an ein spezifisches Form Element angehängt, öffnet eine einzelne Instanz und kann parameterabhängig konfiguriert werden.

# Übersicht

| Name              | Typ        | Methode                |
| :---------------- | :--------- | :--------------------- |
| krAkkordeon       | spezifisch | `.krAkkordeon()`       |
| krFileExternal    | global     | `.krFileExternal()`    |
| krForm            | spezifisch | `.krForm()`            |
| krLinkExternal    | global     | `.krLinkExternal()`    |
| krNav             | spezifisch | `.krNav()`             |
| krScrollTo        | spezifisch | `.krScrollTo()`        |
| krTopLink         | spezifisch | `.krTopLink()`         |
| krXioniNews       | global     | `.krXioniNews()`       |
| krBackgroundImage | global     | `.krBackgroundImage()` |
| krMailto          | global     | `.krMailto()`          |
| krMobileDetect    | global     | `.krMobileDetect()`    |
| krShop            | global     | `.krShop()`            |
