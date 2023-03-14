# \<Component>

Description

## Parameter

| Parameter | Typ                   | Default               | Beschreibung                |
| --------- | --------------------- | --------------------- | --------------------------- |
| `ratio`   | `[number, number]`    | `[16,9]`              | Seitenverhältnis des Videos |
| `allow`   | `YoutubePropsAllow[]` | `['encrypted-media']` | Siehe `Youtube.types.ts`    |
| `videoId` | `string`              |                       | YouTube Video Id            |
| `id`      | `string`              |                       |                             |
| `class`   | `string`              |                       |                             |

## Slots

keine

## Styles

```CSS
.YouTube {
  &__frame {} /* Video iFrame Einbettung */
}
```
