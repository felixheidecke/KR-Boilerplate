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
  .-body {}
  .-errors {} // Liste der Fehler
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
  &.--checked {}

  // Elemente
  .-input {}
  .-label {}
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
  .-input {}
  .-label {}
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
  .-input {}
  .-label {}
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
  .-input {}
  .-label {}
}
```

## Submit

Der "Abschicken" Button

```HTML
<Submit name="text" />
```

### Attribute

| Attribut   | Standard     | Beschreibung       |
| :--------- | :----------- | :----------------- |
| `text`     | `Abschicken` | Feldname           |
| `disabled` | `false`      | Button deaktiviert |

### Events

| Attribut | Payload |
| :------- | :------ |
| `click`  | -       |

### Styling

```SCSS
.Submit { }
```

---

- (\*) Ist Verpflichtend
