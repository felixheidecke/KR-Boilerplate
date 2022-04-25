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

<style>
  div {
    background: lime;
  }
</style>
```

| Attribut | Standard | Beschreibung     |
| -------- | -------- | ---------------- |
| `ratio`  | `16:9`   | Seitenverhältnis |

---

# Grid

```HTML
<Grid gap>
  <Grid size="1-2 tablet-1-3 desktop-1-5">Links</Grid>
  <Grid size="1-2 tablet-2-3 desktop-4-5">Rechts</Grid>
</Grid>
```

| Attribute | Standardwert | Beschreibung                 | Hinweis!        |
| --------- | ------------ | ---------------------------- | --------------- |
| `size`    | `-`          | Variable Spaltenbreiten      | nur für Spalten |
| `gap`     | `false`      | Abstand zwischen den Spalten | nur für Wraper  |

**Verfügbar Breiten**

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

| Attribute | Standard        | Beschreibung      |
| :-------- | :-------------- | :---------------- |
| `name`    | `fas fa-carrot` | Font-Awesome icon |
| `size`    | `1`             | Icon Größe (2…10) |

---

# In View

Der `<InView>` Wrapper umschließt seinen Inhalt mit einem `<div>`, welches die Klasse `--in-view` erhält, wenn es sich im Sichtbaren bereich befindet.

```HTML
<InView transition="scale">
  <p>hallo</p>
</InView>
```

| Attribut     | Standard | Beschreibung    |
| ------------ | -------- | --------------- |
| `transition` | `fade`   | Trasition style |

Verfügbare Werte für `transition` sind _"fade"_ und _"slide"_

---

# Mail

```HTML
Meine E-Mail Adresse: <Mail to="max@mustermann.de" />
```

```HTML
Schicke eine Mail an <Mail to="max@mustermann.de">Max Mustermann</Mail>
```

| Attribut  | Standard       | Beschreibung                 |
| --------- | -------------- | ---------------------------- |
| `to` (\*) | -              | E-Mail Adresse               |
| `icon`    | `false` (\*\*) | Standard Icon wird angezeigt |

_(\*\* Hier kann auch ein Icon string platziert werden. Bspw: `fab fa-apple`)_

---

# Nav

Zeigt die Slider-Navigation an.

```HTML
<Nav variant="slide" />
```

Darstellung der `<Nav variant="slide" />` und `<Nav variant="bar" />` Navigation für verschiedene Breakpoints.

```HTML
<!-- Lange Fassung -->
<Nav breakpoint="1024px" />

<!-- Kurze Fassung -->
<Nav />
```

**Styles**

Styling für beide Varianten kann in `src/styles/extend/nav.scss` erweitert oder überschrieben werden.

| Attribut | Standard | Beschreibung |
| -------- | -------- | ------------ |
| `on`     | `false`  | Breakpoint   |

---

# Picture

```HTML
<Picture
  src="/images/512.png"
  tablet="/images/1920.png"
/>
```

| Attribute    | Standardwert | Beschreibung      |
| ------------ | ------------ | ----------------- |
| `src` (\*)   | -            | Standard Bildpfad |
| `alt`        | -            | Bildbeschreibung  |
| `loading`    | `lazy`       | Ladeverhalten     |
| `tablet`     | `false`      | Bildpfad >= 768px |
| `desktop`    | `false`      | Bildpfad > 1024px |
| `widescreen` | `false`      | Bildpfad > 1440px |

[The Image Embed element (developer.mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

---

# Slider

```HTML
<Swiper autoplay="2500">
  <Picture src="http://placeimg.com/640/480/any" />
  <Picture src="http://placeimg.com/640/480/arch" />
  <Picture src="http://placeimg.com/640/480/nature" />
</Swiper>
```

| Attribute    | Type              | Default | Description                                                   |
| :----------- | :---------------- | :------ | :------------------------------------------------------------ |
| `autoplay`   | `Number, Boolean` | `false` | Change slides after a specified interval.                     |
| `hoverpause` | `Boolean`         | `true`  | Stop autoplay on mouseover event.                             |
| `perView`    | `Number`          | `1`     | A number of slides visible on the single viewport.            |
| `speed`      | `Number`          | `1000`  | Duration of the animation in milliseconds.                    |
| `startAt`    | `Number`          | `0`     | Start at specific slide number defined with zero-based index. |

---

# Toplink

```HTML
<Toplink />
```

---

# YouTube

```HTML
<YouTube id="dQw4w9WgXcQ">
```

| Attribute | Default | Description            |
| :-------- | :------ | :--------------------- |
| `id` (\*) | -       | YouTube Video ID       |
| `ratio`   | `16:9`  | Video Seitenverhältnis |

---

_(\* = Pflichfeld)_

# Formular

Das standard Gerüst rund um Formular Eingabefelder.

```HTML
<Form id="4" subject="Betreff">
  [...]
</Form>
```

| Attribute | Default          | Description           |
| :-------- | :--------------- | :-------------------- |
| `id` (\*) | -                | Formular Empfänger ID |
| `subject` | `Neue Nachricht` | Betreff               |

## Checkbox

```HTML
<Checkbox name="agb" label="Ich habe die AGB gelesen und akzeptiere." required />
```

| Attribute   | Default | Description       |
| :---------- | :------ | :---------------- |
| `name` (\*) | -       | Feldname          |
| `label`     | -       | Beschreibungstext |
| `required`  | `false` | Pflichtfeld       |
| `checked`   | `false` | Vorausgewählt     |

## Input

```HTML
<Input name="name" label="Vor- & Nachname" required />
```

| Attribute     | Default | Description          |
| :------------ | :------ | :------------------- |
| `name` (\*)   | -       | Feldname             |
| `label`       | -       | Beschreibungstext    |
| `placeholder` | -       | Platzhaltertext      |
| `required`    | `false` | Pflichtfeld          |
| `type`        | `text`  | Vorausgewählt        |
| `value`       | -       | Vorausgefüllter Text |

## Radio

```HTML
<Radio name="agb" label="Ich habe die AGB gelesen und akzeptiere." required />
```

| Attribute    | Default | Description       |
| :----------- | :------ | :---------------- |
| `name` (\*)  | -       | Feldname          |
| `value` (\*) | -       | Wert              |
| `label`      | -       | Beschreibungstext |
| `required`   | `false` | Pflichtfeld       |
| `checked`    | `false` | Vorausgewählt     |

## Select

```HTML
<Select name="tier" label="Lieblingstier" options={['Hund', 'Katze', 'Maus']} />
```

| Attribute   | Default   | Description                     |
| :---------- | :-------- | :------------------------------ |
| `name` (\*) | -         | Feldname                        |
| `label`     | -         | Beschreibungstext               |
| `options`   | `[]`      | Liste von Optionen              |
| `required`  | `false`   | Pflichtfeld                     |
| `values`    | `options` | 1:1 Werte Mapping für `options` |

## Submit

Der "Abschicken" Button

```HTML
<Submit name="tier" label="Lieblingstier" options={['Hund', 'Katze', 'Maus']} />
```

| Attribute  | Default      | Description        |
| :--------- | :----------- | :----------------- |
| `text`     | `Abschicken` | Feldname           |
| `disabled` | `false`      | Button deaktiviert |
