## Routen

Die Navigation kann mit dem `<Nav />`-Tag ausgespielt werden.

In der Datei `src/routes.yml` wird die Navigationsstruktur gepflegt.

### Beispiel

```YML
/team:
  name: Das Team
  class: nav-team
  icon: fas fa-user-friends

  /mitarbeiter/frank:
    name: Frank Förster

  /mitarbeiter/daniel:
    name: Daniel Haus

  /mitarbeiter/felix:
    name: Felix Heidecke
```

**Kurzform**, wenn _ausschließlich_ der Name gesetzt wird:

```YML
/mitarbeiter/frank: Frank Förster
```
