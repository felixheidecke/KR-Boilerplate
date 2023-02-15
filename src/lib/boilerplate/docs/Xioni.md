# Artikel Liste

Liste mehrerer Artikel basieren auf einer modul Id

```HTML
<XioniArticleList
  id="123"
  button-text="Jetzt weiterlesen"
  detail-path="/news"
/>
```

### Attribute

| Attribut          | Standard         | Beschreibung              |
| :---------------- | :--------------- | :------------------------ |
| `author`          | `false`          | Author anzeigen           |
| `date`            | `false`          | Datum anzeigen            |
| `expanded` (1)    | `false`          | Artikel in gänze anzeigen |
| `id` (\*)         | `-`              | Modul Id                  |
| `limit`           | `100`            | Artikelmenge limitieren   |
| `button-text` (2) | `...weiterlesen` | Button Text               |
| `detail-path`     | `''`             | Pfad zur Detailsseite     |

1. Alle Inhalte der Artikel werden dargestellt. Eine Verlinkung zu einer Detailansicht wird nicht angezeigt.
2. Verfügbar wenn `expanded`

## Styling

```SCSS
// Wrapper um alle Artikel
.XioniArticleList { }

.XioniArticle {
  &__title { }
  &__meta { }
  &__author { }
  &__date { }

  &__image { }
  &__teaser { }

  &__content { }
  &__content-image { }
  &__content-image--right { }
  &__content-image--left { }

  &__pdf { }

  &__read-more { }
}
```

# Events

Liste mehrerer Events basieren auf einer modul Id

```HTML
  <XioniEventList module="15" />
```

### Attribute

| Attribut       | Standard | Beschreibung               |
| :------------- | :------- | :------------------------- |
| `modul` (\*)   | -        | modul ID                   |
| `limit`        | `100`    | Eventmenge limitieren      |
| `registration` | `false`  | Eventregistierung anzeigen |
| `website`      | `true`   | Website Link anzeigen      |
| `pdf`          | `true`   | PDF Link anzeigen          |

---

(\*) Pflichfeld
