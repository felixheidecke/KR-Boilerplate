## Grundlagen

- Helperklassen können an allen HTML Elementen (`<div>`, `<a>`, `<h1>`, ... ) und allen Komponenten (`<Aspect>`, `<Mail>`, ... ) verwendet werden.
- Helper beginnen immer mit einem `$` um diese sehr einfach als Helper zu erkennen.
- Viele Helper enthalten Breakpoint Modifikatoren, die mit einem `@` gekennzeichnet sind.

## Margin & Padding

**Grundlagen**

Die `$m` und `$p` Klassen verwendet werden um `1 rem` Abstand außerhalb oder innerhalb eines Elements einzustellen.

**Richtungen**

Mit den Anhängent `t`, `r`, `b`, `t`, `x` und `y` können die jeweiligen Richtungen angesprochen werden.  
Hier am Beispiel der `$m` Klasse.

| Klasse | Entspricht                               |
| ------ | ---------------------------------------- |
| `$m`   | `margin: 1rem;` _(Ohne Richtung)_        |
| `$mt`  | `margin-top: 1rem;`                      |
| `$mr`  | `margin-right: 1rem;`                    |
| `$mb`  | `margin-bottom: 1rem;`                   |
| `$ml`  | `margin-left: 1rem;`                     |
| `$mx`  | `margin-left: 1rem; margin-right: 1rem;` |
| `$my`  | `margin-top: 1rem; margin-bottom: 1rem;` |

**Multiplikatoren**

Einstellen des `rem` Multiplikators

| Klasse   | Entspricht (rem) | (px) |
| -------- | :--------------: | :--: |
| `$m-0`   |       `0`        | `0`  |
| `$m-1/4` |      `0.25`      | `4`  |
| `$m-1/2` |      `0.5`       | `8`  |
| `$m`     |       `1`        | `16` |
| `$m-2`   |       `2`        | `32` |
| `$m-3`   |       `3`        | `48` |
| `$m-4`   |       `4`        | `64` |
| `$m-5`   |       `5`        | `80` |
| `$m-6`   |       `6`        | `96` |

**Breakpoint**

Alle Margin Helper können auf bestimmte Viewports beschränkt werden.  
Hier am Beispiel der `$m` Klasse.

| Klasse            | Entspricht                                    |
| ----------------- | --------------------------------------------- |
| `$m@mobile`       | `(max-width: 620px)`                          |
| `$m@tablet`       | `(min-width: 621px) and (max-width: 1024px)`  |
| `$m@tablet-up`    | `(min-width: 621px)`                          |
| `$m@tablet-down`  | `(max-width: 1024px)`                         |
| `$m@desktop`      | `(min-width: 1025px) and (max-width: 1440px)` |
| `$m@desktop-up`   | `(min-width: 1025px)`                         |
| `$m@desktop-down` | `(max-width: 1440px)`                         |
| `$m@widescreen`   | `(min-width: 1441px)`                         |

### Beispiele

## Margin & Padding

**Grundlagen**

Die `$m` und `$p` Klassen verwendet werden um `1 rem` Abstand außerhalb oder innerhalb eines Elements einzustellen.

**Richtungen**

Mit den Anhängent `t`, `r`, `b`, `t`, `x` und `y` können die jeweiligen Richtungen angesprochen werden.  
Hier am Beispiel der `$m` Klasse.

| Klasse | Entspricht                               |
| ------ | ---------------------------------------- |
| `$m`   | `margin: 1rem;` _(Ohne Richtung)_        |
| `$mt`  | `margin-top: 1rem;`                      |
| `$mr`  | `margin-right: 1rem;`                    |
| `$mb`  | `margin-bottom: 1rem;`                   |
| `$ml`  | `margin-left: 1rem;`                     |
| `$mx`  | `margin-left: 1rem; margin-right: 1rem;` |
| `$my`  | `margin-top: 1rem; margin-bottom: 1rem;` |

**Multiplikatoren**

Einstellen des `rem` Multiplikators

| Klasse   | Entspricht (rem) | (px) |
| -------- | :--------------: | :--: |
| `$m-0`   |       `0`        | `0`  |
| `$m-1/4` |      `0.25`      | `4`  |
| `$m-1/2` |      `0.5`       | `8`  |
| `$m`     |       `1`        | `16` |
| `$m-2`   |       `2`        | `32` |
| `$m-3`   |       `3`        | `48` |
| `$m-4`   |       `4`        | `64` |
| `$m-5`   |       `5`        | `80` |
| `$m-6`   |       `6`        | `96` |

**Breakpoint**

Alle Margin Helper können auf bestimmte Viewports beschränkt werden.  
Hier am Beispiel der `$m` Klasse.

| Klasse            | Entspricht                                    |
| ----------------- | --------------------------------------------- |
| `$m@mobile`       | `(max-width: 620px)`                          |
| `$m@tablet`       | `(min-width: 621px) and (max-width: 1024px)`  |
| `$m@tablet-up`    | `(min-width: 621px)`                          |
| `$m@tablet-down`  | `(max-width: 1024px)`                         |
| `$m@desktop`      | `(min-width: 1025px) and (max-width: 1440px)` |
| `$m@desktop-up`   | `(min-width: 1025px)`                         |
| `$m@desktop-down` | `(max-width: 1440px)`                         |
| `$m@widescreen`   | `(min-width: 1441px)`                         |

### Beispiele

```HTML
<!-- Margin top von 0.5rem ab Desktop und aufwärts -->
<div class="$mt-1/2@desktop-up" />

<!-- Margin top & bottom von 6rem auf Tablet -->
<div class="$my-6@tablet" />
```

## Weitere Helper

| Kategorie | Klasse             | Infos                   |
| --------- | ------------------ | ----------------------- |
| Position  | `$relative`        |                         |
| Position  | `$absolute`        |                         |
| Position  | `$absolute-center` | Absolut mittig          |
| Position  | `$fixed`           |                         |
| Position  | `$sticky`          |                         |
| Display   | `$hidden`          | Unterstützt Breakpoints |
| Font      | `$font-smaller`    | Schriftgröße `0.875rem` |
| Font      | `$font-small`      | Schriftgröße `0.75rem`  |
| Font      | `$font-large`      | Schriftgröße `1.125rem` |
| Font      | `$font-larger`     | Schriftgröße `1.25rem`  |
| Font      | `$font-bold`       |                         |
| Font      | `$font-italic`     |                         |
| Text      | `$underline`       |                         |
| Text      | `$text-center`     |                         |
| Text      | `$text-right`      |                         |
| Cursor    | `$pointer`         |                         |
| Float     | `$float-left`      |                         |
| Float     | `$float-right`     |                         |
