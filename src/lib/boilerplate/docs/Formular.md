# Form

```HTML
<Form>
  <!-- Inhalte -->
</Form>
```

### Attribute

| Attribut       | Standard         | Beschreibung     |
| :------------- | :--------------- | :--------------- |
| `id` (\*)      | `0`              | Empfänger ID     |
| `subject` (\*) | `Kontakformular` | Formular Betreff |

### Styling

```SCSS
.Form {
  &__body {}
  &__errors {} // Liste der Fehler
}
```

# Checkbox

```HTML
<Checkbox name="test" />
```

### Attribute

| Attribut    | Standard         | Beschreibung  |
| :---------- | :--------------- | :------------ |
| `name` (\*) | -                | Feldname      |
| `checked`   | `false`          | Vorausgefüllt |
| `label`     | `false`          | Label         |
| `required`  | `Kontakformular` | Pflichfeld    |

### Bindings

| Attribut  | Payload   |
| :-------- | :-------- |
| `checked` | _boolean_ |

### Styling

```SCSS
.Checkbox {

  // Modifier
  &--active {}

  // Elemente
  &__input {}
  &__label {}
}
```

# Input

```HTML
<Input name="name" label="Vor- & Nachname" required />
```

### Attribute

| Attribut      | Standard | Beschreibung         |
| :------------ | :------- | :------------------- |
| `name` (\*)   | -        | Feldname             |
| `label`       | -        | Label                |
| `placeholder` | -        | Platzhaltertext      |
| `required`    | `false`  | Pflichtfeld          |
| `type`        | `text`   | Vorausgewählt        |
| `value`       | -        | Vorausgefüllter Text |

### Bindings

| Attribut | Payload  |
| :------- | :------- |
| `value`  | _string_ |

### Styling

```SCSS
.Input {

  // Elemente
  &__input {}
  &__label {}
}
```

# Radio

```HTML
<Radio name="agb" label="Ich habe die AGB gelesen und akzeptiere." required />
```

### Attribute

| Attribut     | Standard | Beschreibung      |
| :----------- | :------- | :---------------- |
| `name` (\*)  | -        | Feldname          |
| `value` (\*) | -        | Wert              |
| `label`      | -        | Beschreibungstext |
| `required`   | `false`  | Pflichtfeld       |
| `checked`    | `false`  | Vorausgewählt     |

### Bindings

| Attribut | Payload  |
| :------- | :------- |
| `group`  | _string_ |

### Styling

```SCSS
.Radio {

  // Elemente
  &__input {}
  &__label {}
}
```

# Select

```HTML
<Select name="tier" label="Lieblingstier" options={['Hund', 'Katze', 'Maus']} />
```

### Attribute

| Attribut    | Standard  | Beschreibung                    |
| :---------- | :-------- | :------------------------------ |
| `name` (\*) | -         | Feldname                        |
| `label`     | -         | Beschreibungstext               |
| `options`   | `[]`      | Liste von Optionen              |
| `required`  | `false`   | Pflichtfeld                     |
| `values`    | `options` | 1:1 Werte Mapping für `options` |

### Bindings

| Attribut | Payload  |
| :------- | :------- |
| `value`  | _string_ |

### Styling

```SCSS
.Select {

  // Elemente
  &__input {}
  &__label {}
}
```

# Textarea

```HTML
<Textarea name="message" label="Ihre Nachricht" />
```

### Attribute

| Attribut    | Standard | Beschreibung      |
| :---------- | :------- | :---------------- |
| label       | -        | Beschreibungstext |
| name\*      | -        | Name              |
| placeholder | -        | Platzhalter       |
| rows        | `4`      | Höhe des Felds    |

### Bindings

| Attribut | Payload  |
| :------- | :------- |
| `value`  | _string_ |

### Styling

```SCSS
.Textarea {
  &__label { }
  &__input { }
}
```

# Submit

Der "Abschicken" Button

```HTML
<Submit name="text" />
```

### Attribute

| Attribut   | Standard     | Beschreibung       |
| :--------- | :----------- | :----------------- |
| `text`     | `Abschicken` | Feldname           |
| `disabled` | `false`      | Button deaktiviert |

\* = Pflichtfeld

### Events

| Attribut | Payload |
| :------- | :------ |
| `click`  | -       |

### Styling

```SCSS
.Submit { }
```
