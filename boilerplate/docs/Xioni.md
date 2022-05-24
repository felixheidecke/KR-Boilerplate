# Artikel Liste

Liste mehrerer Artikel basieren auf einer modul Id

```HTML
<XioniArticles id="123" />
```

### Attribute

| Attribut       | Standard | Beschreibung                   |
| :------------- | :------- | :----------------------------- |
| `id` (\*)      | `-`      | Modul Id                       |
| `author`       | `false`  | Author anzeigen                |
| `config` (1)   | `null`   | Erweiterte Xioni Konfiguration |
| `date`         | `false`  | Datum anzeigen                 |
| `expanded` (2) | `false`  | Artikel in gänze anzeigen      |
| `limit`        | `100`    | Artikelmenge limitieren        |

- (\*) Ist Verpflichtend

1. Hier kann eine Konfiguration eingespielt werden.
2. Alle Inhalte der Artikel werden dargestellt. Eine Verlinkung zu einer Detailansicht wird nicht angezeigt.

### 2. Erweiterte Konfiguration

Die Artikelliste kann optional über ein Konfigurationsmodel gesteuert werden.

Hier steht zusätzlich `detailPagePrefix` zur Verfügung. Darüber kann ein Detailseiten Prefix gesetzt werden, wenn die Detailseite bspw. wie folgt heißt: `meine-detailseite-[id]-[url].svelte`

```HTML

<script>
  const config = {
    id: 1332,
    author: true,
    date: false,
    expanded: false,
    limit: 10,
    detailPagePrefix: "meine-detailseite-"
  }
</script>

<XioniArticles {config} />
```

## Styling

```SCSS
.XioniArticles {
  .-article {
    .-title { }

    // Verfügbar wenn date oder author aktiviert
    .-meta { }
    .-meta-date { }
    .-meta-author { }

    .-picture { }
    .-teaser { }

    // Verfügbar wenn expanded
    .-text { }
    .-text-picture { }
  }

  .-read-more {}
}
```

# Artikel

Darstellung eines einzelnene Artikels

```HTML
<XioniArticle id="11579" />
```

### Attribute

| Attribut       | Standard | Beschreibung              |
| :------------- | :------- | :------------------------ |
| `id` (\*)      | `-`      | Artikel Id                |
| `author`       | `false`  | Author anzeigen           |
| `date`         | `false`  | Datum anzeigen            |
| `expanded` (1) | `false`  | Artikel in gänze anzeigen |

- (\*) Ist Verpflichtend

1. Alle Inhalte der Artikel werden dargestellt. Eine Verlinkung zu einer Detailansicht wird nicht angezeigt.

## Styling

```SCSS
.XioniArticles {
  .-title { }

  // Verfügbar wenn date oder author aktiviert
  .-meta { }
  .-meta-date { }
  .-meta-author { }

  .-picture { }
  .-teaser { }

  // Verfügbar wenn expanded
  .-text { }
  .-text-picture { }
}
```

# Sceleton

Plathalter Elemente, so lange der Content noch nicht geladen wurde.

### Styling

```SCSS
.XioniSceleton {
  .-item {}
}
```
