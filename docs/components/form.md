### Beispiel:

**HTML**

```HTML
<form class="kr-form" id="my_form" method="post" action="https://www.klickrhein.de/form/kr-kontakt.php">
    <input type="hidden" name="subject" value="Der Betreff">
    <input type="hidden" name="required" value="firstname, lastname, agb">
    <input type="hidden" name="id" value="1">
    <div class="pure-g pure-padded-children-halved">
        <div class="pure-u-1 pure-u-sm-1-2 kr-form-item-text">
            <label for="firstname">Firstname</label>
            <input id="firstname" type="text" name="firstname">
        </div>
        <div class="pure-u-1 pure-u-sm-1-2 kr-form-item-text">
            <label for="lastname">Lastname</label>
            <input id="lastname" type="text" name="lastname">
        </div>
        <div class="pure-u-1 pure-u-sm-1-4 kr-form-item-text">
            <label for="plz">PLZ</label>
            <input id="plz" type="number" name="plz">
        </div>
        <div class="pure-u-1 pure-u-sm-3-4 kr-form-item-text">
            <label for="street">Straße</label>
            <input id="street" type="text" name="street">
        </div>
        <div class="pure-u-1 kr-form-item-select">
            <label for="favname">Lieblingsname:</label>
            <select id="favname" name="favname">
                <option value="">bitte wählen</option>
                <optgroup label="Weiblich">
                    <option>Anne</option>
                    <option>Doris</option>
                    <option>Angelika</option>
                </optgroup>
                <optgroup label="Männlich">
                    <option>Bert</option>
                    <option>Christoph</option>
                    <option>Emil</option>
                    <option>Frank</option>
                </optgroup>
            </select>
        </div>
        <div class="pure-u-1 kr-form-item-textarea">
            <label for="message">Ihre Nachricht</label>
            <textarea id="message" name="message" cols="30" rows="10"></textarea>
        </div>
        <div class="pure-u-1 pure-u-sm-1-2 kr-form-item-clicker">
            <label for="agb">
                <input id="agb" type="checkbox" name="agb">Ich habe die AGB gelesen und akzeptiert.
            </label>
        </div>
        <div class="pure-u-1 pure-u-sm-1-2 h-text-right">
            <button class="kr-button" type="submit">Abschicken</button>
        </div>
    </div>
</form>
```

**JS**

```JS
require('scripts/js/form.js');
requirejs(['jquery'], function() {
	$('#my_form').krForm();
});
```

### Beispiel:

| Key           | Type   | Default                                                                                                      | Description            |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------ | ---------------------- |
| textOnLoading | String | `"Sendet"`                                                                                                   | Button Text beim laden |
| textOnError   | String | `"<strong>Ein Fehler ist aufgetreten!</strong><br>Bitte füllen Sie alle mit einem * markierten Felder aus!"` | Text für Fehlermeldung |
| textOnSuccess | String | `"<strong>Vielen Dank für Ihre Nachricht.</strong><br>Wir setzen uns in Kürze mit Ihnen in Verbindung"`      | Text bei Erfolg        |
