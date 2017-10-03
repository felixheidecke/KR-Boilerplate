# KR-Boilerplate
Eine Framework von Klickrhein.de in zusammenarbeit mit felix.heidecke.me

---

### KR-Mailto

```
$('body').krMailto();  // Alle Elemente innerhalb von "body" transformieren
```

Um eine E-Mail Adresse zu verschleiern wird folgender Code verwendet.

`<span data-mailto>max[at]muster[minus]mann[dot]de</span>`

ergibt: `<a href="mailto:max@muster-mann.de">max@muster-mann.de</a>`

Optional kann die Adresse ohne Hyperlink ausgegeben werden:

`<span data-mailto="false">max[at]muster[minus]mann[dot]de</span>`

ergibt: `max@muster-mann.de`

---

### KR-Akkordeon

```
$(".demo").krAkkordeon({        // Auf Element .demo anwenden
    initClosed    :  true,      // Alle Karten schließen (Initial)
    initfirstOpen :  true,      // Erste Karte geöffnet (Initial)
    speed         : "fast",     // Slide Speed
    onlyOneCard   :  true       // Nur eine Karte zu jedem Zeitpunkt geöffnet
    cardItem      : '.card',    // Karten Klasse (Initial)
    tabItem       : '.tab',     // Tab Klasse (Initial)
    contentItem   : '.content', // Inhalt Klasse (Initial)
    activeClass   : 'is-active' // Aktive Klasse (Initial)
});
```