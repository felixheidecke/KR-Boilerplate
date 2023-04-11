# \<Swiper>

A dependency-free JavaScript ES6 slider and carousel. It’s lightweight, flexible and fast. Designed to slide. No less, no more

## Parameter

| Parameter  | Typ                              | Default      | Beschreibung                                         |
| ---------- | -------------------------------- | ------------ | ---------------------------------------------------- |
| `autoplay` | `number`                         | `0`          | Change slides after a specified interval             |
| `focusAt`  | `'center' \| number`             | `'center'`   | Focus currently active slide at a specified position |
| `gap`      | `number`                         | `0`          | A size of the space between slides                   |
| `images`   | `{ src: string; alt: string }[]` |              | Images to be displayed                               |
| `perView`  | `number`                         | `1`          | A number of visible slides                           |
| `speed`    | `number`                         | `1500`       | Duration of the animation                            |
| `startAt`  | `number`                         | `0`          | Start at specific slide number                       |
| `type`     | `'slider' \| 'carousel'`         | `'carousel'` | Type of the movement                                 |
| `nav`      | `boolean`                        | `true`       | Show navigation arrows                               |
| `config`   | `object`                         |              | Full Glide.js Config model                           |
| `exClass`  | `string`                         |              | Exclusive Classname                                  |

## Slots

`default`

## Styles

```CSS
.Swiper {
  &__button        {}
  &__button--prev  {}
  &__button--next  {}

  &__button-icon   {}
```
