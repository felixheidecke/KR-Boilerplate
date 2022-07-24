# Akkordeon

```HTML
<Accordion>
  <AccordionSlide title="Martin Behaim">
    Martin Behaim (* 6. Oktober 1459 in Nürnberg; † 29. Juli 1507 in Lissabon, Portugal),
    auch Martin Bohemus, port. Martinho da Boémia und lat. Martinus de Boemia, war ein
    Tuchhändler aus Nürnberg und Ritter des Königreichs Portugal. Bekannt geworden ist er als
    Anreger des ältesten erhaltenen Globus.
  </AccordionSlide>
  <AccordionSlide title="Linh Dinh">
    Linh Dinh (vietnamesisch Đinh Linh, * 1963 in Saigon, Vietnam) ist ein vietnamesisch-
    amerikanischer Autor, Übersetzer und Fotograf. Er war Picador Guest Professor am Institut
    für Amerikanistik der Universität Leipzig im Wintersemester 2015/2016.
  </AccordionSlide>
</Accordion>
```

### Styling

```SCSS
.Accordion { }

// Slide
.AccordionSlide {

  // Titelseite
  &__title { }

  // Text/Bild inhalt
  &__content { }
}
```

---

# Aspect

Der `<Aspect>` Wrapper umschließt seinen Inhalt mit einem `<div>`, dessen Seitenverhältnis entsprechend der `ratio` gleich bleibt.  
Überfluss wird versteckt.

```HTML
<Aspect ratio="4:3">
  <div>
    Im bin im Seitenverhältnis 4 zu 3
  </div>
</Aspect>
```

### Attribute

| Attribut | Standard | Beschreibung     |
| -------- | -------- | ---------------- |
| `ratio`  | `16:9`   | Seitenverhältnis |

---

# Button

```HTML
<!-- 1 -->
<Button icon="fas fa-table" reverse>Öffnungszeiten Anzeigen</Button>

<!-- 2 -->
<Button to="http://apple.com" icon="fab fa-apple">Zur Apple.com Website</Button>
```

### Attribute

| Attribute      | Standard | Beschreibung                |
| :------------- | :------- | :-------------------------- |
| `href` (1)     | `false`  | href Anker                  |
| `icon`         | `false`  | Icon                        |
| `disabled` (2) | `false`  | deaktiviert                 |
| `target` (2)   | `false`  | Anchor target               |
| `reverse` (3)  | `false`  | Elementreihenfolge umdrehen |

1. Macht aus dem `<button>` einen `<a>`
2. Funktioniert nur, wenn `href` gesetzt wurde.
3. Funktioniert nur, wenn mehrere Inhalte im Button zum einsatz kommen. Ggf. `icon`

### Styling

```SCSS
.Button {
  // --- Elements ---------------------
  &__icon {}

  // --- Modifier ---------------------
  &--reverse {} // Wenn ltr
}
```

---

# Grid

```HTML
<Grid gap>
  <Grid size="1-2 tablet-1-3 desktop-1-5">Links</Grid>
  <Grid size="1-2 tablet-2-3 desktop-4-5">Rechts</Grid>
</Grid>
```

### Attribute

| Attribute | Standardwert | Beschreibung                 | Hinweis!        |
| --------- | ------------ | ---------------------------- | --------------- |
| `size`    | `-`          | Variable Spaltenbreiten      | nur für Spalten |
| `gap`     | `false`      | Abstand zwischen den Spalten | nur für Wraper  |

Verfügbare `size` Werte:

| Wert  | Mobile       | Tablet       | Desktop       | Widescreen       | Breite |
| ----- | ------------ | ------------ | ------------- | ---------------- | ------ |
| `1-2` | `mobile-1-2` | `tablet-1-2` | `desktop-1-2` | `widescreen-1-2` | 50%    |
| `1-3` | `mobile-1-3` | `tablet-1-3` | `desktop-1-3` | `widescreen-1-3` | 33%    |
| `2-3` | `mobile-2-3` | `tablet-2-3` | `desktop-2-3` | `widescreen-2-3` | 66%    |
| `1-4` | `mobile-1-4` | `tablet-1-4` | `desktop-1-4` | `widescreen-1-4` | 25%    |
| `3-4` | `mobile-3-4` | `tablet-3-4` | `desktop-3-4` | `widescreen-3-4` | 75%    |
| `1-5` | `mobile-1-5` | `tablet-1-5` | `desktop-1-5` | `widescreen-1-5` | 20%    |
| `2-5` | `mobile-2-5` | `tablet-2-5` | `desktop-2-5` | `widescreen-2-5` | 40%    |
| `3-5` | `mobile-3-5` | `tablet-3-5` | `desktop-3-5` | `widescreen-3-5` | 60%    |
| `4-5` | `mobile-4-5` | `tablet-4-5` | `desktop-4-5` | `widescreen-4-5` | 80%    |

---

# Icon

```HTML
<Icon name="fab fa-apple" />
<Icon name="fas fa-biking" size="5" />
<Icon name="fas fa-bath" size="10" />
```

### Attribute

| Attribute | Standard        | Beschreibung      |
| :-------- | :-------------- | :---------------- |
| `name`    | `fas fa-carrot` | Font-Awesome icon |
| `size`    | `1`             | Icon Größe (2…10) |

---

# In View

Der `<InView>` Wrapper umschließt seinen Inhalt mit einem `<div>`, welches die Klasse `.InView--visible` erhält, wenn es sich im Sichtbaren bereich befindet.

```HTML
<InView transition="scale">
  <p>hallo</p>
</InView>
```

### Attribute

| Attribut     | Standard | Beschreibung    |
| ------------ | -------- | --------------- |
| `transition` | `fade`\* | Trasition style |

\* Verfügbare Werte: `fade` und `slide`

### Styling

```SCSS
.InView {
  &--fade { }
  &--scale { }
}
```

---

# List

Listen, bei der jedes Element das gleiche Icon vorangestellt werden soll, werden über die `use` action hinzugefügt.

```HTML
<script>
  import icon from '@/js/use.icon';
</script>

<ul use:icon={'fas fa-caret-right'}>
  <li>Lorem ipsum</li>
  <li>Consectetur adipisicing</li>
  <li>Dolor sit amet</li>
</ul>
```

# Mail

```HTML
Meine E-Mail Adresse: <Mail to="max@mustermann.de" />
Schicke eine Mail an <Mail to="max@mustermann.de">Max Mustermann</Mail>
```

### Attribute

| Attribut | Standard    | Beschreibung                 |
| -------- | ----------- | ---------------------------- |
| `to`\*   | -           | E-Mail Adresse               |
| `icon`   | `false`\*\* | Standard Icon wird angezeigt |

_(\*\* Hier kann auch ein Icon string platziert werden. Bspw: `fab fa-apple`)_

### Style

```SCSS
.Mail {
  &__icon { }
  &__address { }
}
```

---

# Picture

```HTML
<Picture
  src="https://picsum.photos/768/432"
  tablet="https://picsum.photos/1024/576"
  desktop="https://picsum.photos/1440/810"
  widescreen="https://picsum.photos/1920/1080"
/>
```

### Attribute

| Attribute    | Standard | Beschreibung      |
| ------------ | -------- | ----------------- |
| `src` (\*)   | -        | Standard Bildpfad |
| `alt`        | -        | Bildbeschreibung  |
| `loading`    | `lazy`   | Ladeverhalten     |
| `tablet`     | `false`  | Bildpfad >= 768px |
| `desktop`    | `false`  | Bildpfad > 1024px |
| `widescreen` | `false`  | Bildpfad > 1440px |

[The Image Embed element (developer.mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

### Style

```SCSS
// Wrapper
.Picture {

  // <img />
  &__img { }
}
```

---

# Swiper

```HTML
<Swiper autoplay="3500">
  <img src="https://picsum.photos/id/1011/1280/720" alt="1011" />
  <img src="https://picsum.photos/id/1015/1280/720" alt="1015" />
  <img src="https://picsum.photos/id/1025/1280/720" alt="1025" />
</Swiper>
```

### Attribute

| Attribute    | Standard | Beschreibung                                                  |
| :----------- | :------- | :------------------------------------------------------------ |
| `autoplay`   | `false`  | Change slides after a specified interval.                     |
| `hoverpause` | `true`   | Stop autoplay on mouseover event.                             |
| `perView`    | `1`      | A number of slides visible on the single viewport.            |
| `speed`      | `1000`   | Duration of the animation in milliseconds.                    |
| `startAt`    | `0`      | Start at specific slide number defined with zero-based index. |

### Style

```SCSS
.Swiper {

  &__button { }
  &__button--prev { }
  &__button--next { }

  &__button-icon { }
}
```

---

# Toplink

```HTML
<Toplink />
```

### Style

```SCSS
.Toplink {
  &--visible { }
}
```

---

# YouTube

```HTML
<YouTube id="dQw4w9WgXcQ">
```

### Attribute

| Attribute | Default | Description            |
| :-------- | :------ | :--------------------- |
| `id`\*    | -       | YouTube Video ID       |
| `ratio`   | `16:9`  | Video Seitenverhältnis |
| `allow`   | \*\*    | Konfiguration          |

\* = Pflichfeld  
\*\* = `['autoplay', 'clipboard-write', 'encrypted-media', 'picture-in-picture']`

### Style

```SCSS
.YouTube {
  &__iframe { }
}
```
