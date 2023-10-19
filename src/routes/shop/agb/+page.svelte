<script>
	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	const { info } = data

	// -----------------------------------------------------------------------------------------------
</script>

<svelte:head>
	<title>Allgemeine Geschäftsbedingungen</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<pre hidden>{JSON.stringify(info, 2, null)}</pre>

<h1>Muster - Test - MUSTER - T E S T - muster - M U S T E R</h1>
<hr />
<h2>Marius: Kannst du uns eure AGB schicken?</h2>
<hr />
<h2>Allgemeine Geschäftsbedingungen</h2>
<p>
	1. Mit der Auftragserteilung erkennt der Käufer die folgenden allgemeinen Geschäftsbedingungen an.
	Sie sind Bestandteil des Vertrages. Abweichende Geschäftsbedingungen des Käufers erkennen wir
	nicht an.
</p>
<h2>Zustandekommen des Vertrags, Bestellungen</h2>
<p>
	1.1 Mit Ihrer Bestellung geben Sie ein verbindliches Angebot an uns ab, mit Ihnen einen Vertrag zu
	schließen. Wir können dieses Angebot annehmen, indem wir Ihnen nach Eingang Ihrer Bestellung eine
	Auftragsbestätigung per E-Mail zusenden. Mit der Zusendung dieser Auftragsbestätigung kommt der
	Vertrag zustande.
</p>
<p>
	1.2 Bei der Bestellung über unseren Onlineshop umfasst der Bestellvorgang für Verbraucher
	insgesamt die folgenden 4 Schritte
</p>
<p>
	a. Sie wählen die Produkte aus und können sie durch das Anklicken des Links "Einkaufen" in den
	Warenkorb legen. Den Inhalt des Warenkorbs können Sie jederzeit durch Anklicken des Links
	"Warenkorb" oder "Einkaufen" unverbindlich ansehen. Sie können Ihre Bestellung im Warenkorb durch
	Anklicken des Links "Aktualisieren" ändern oder die Produkte aus dem Warenkorb entfernen.
</p>
<p>
	b. Wenn Sie die Produkte im Warenkorb kaufen wollen, klicken Sie auf <Link to="/shop/cart"
		>den Warenkorb</Link
	>.
</p>
<p>
	c. Geben Sie Ihre Kundendaten einschließlich Rechnungsanschrift und eventuell abweichender
	Lieferadresse ein, und klicken Sie bitte auf den Link "weiter".
</p>
<p>
	d. Dadurch erhalten Sie eine Übersicht über die von Ihnen bestellten Waren und die von Ihnen
	eingegebenen Kontaktdaten.
</p>
<p>
	(1). Sollten Sie Ihre Angaben ändern oder löschen wollen, klicken Sie auf den Link "Bearbeiten".
</p>
<p>
	(2). Wenn keine weiteren Änderungen erforderlich sind, bestätigen Sie bitte unsere AGB. Klicken
	Sie dann auf den Link "jetzt kaufen", um die Bestellung abzuschließen.
</p>
<p>
	2. Unsere Angebote erfolgen freibleibend und unverbindlich, Sonderabschlüsse und sonstige
	Vereinbarungen bedürfen unserer Bestätigung.
</p>
<p>
	3. Die Preise verstehen sich inklusive Glas, Verpackung und der derzeit gültigen Mehrwertsteuer.
</p>

<h2>Versandkosten innerhalb Deutschland</h2>

<p>
	Beträgt der Gesamtwarenwert mindestens 360,00&nbsp;EUR, so erfolgt die Lieferung innerhalb
	Deutschlands frei Haus.
</p>

<!-- {#if info.shippingCost.rates.length}
	<h4>Versandkosten</h4>

	{#if info.shippingCharges}
		{@html info.shippingCharges.description}
	{/if}

	<ol style="list-style: disc;" class="$pl-2">
		{#each info.shippingCost.rates as { weight, price }}
			<li class="$mb-1/4"><b>{price.formatted}</b> bis einschl. {weight.formatted}</li>
		{/each}
	</ol>
{/if}

{#if additionalCost}
	<p>
		Zuzüglich <strong>
			{additionalCost.formatted}
			{additionalCost.title}
		</strong>
	</p>
{/if}

{#if freeShippingThreshold}
	<p>Freier Versand <strong>ab {freeShippingThreshold.formatted}</strong></p>
{/if} -->

<p>
	4. Alle Rechnungsbeträge sind ohne Abzug sofort fällig. Bei Zahlungsverzug erlauben wir uns,
	bankübliche Zinsen zu berechnen.
</p>
<p>
	5. Bei Vertragsabschlüssen mit Verbrauchern behalten wir uns das Eigentum an der Ware bis zur
	vollständigen Zahlung des Kaufpreises vor, bei Vertragsabschlüssen mit Unternehmen bis zur
	vollständigen Begleichung aller Forderungen aus der laufenden Geschäftsbeziehung.
</p>
<p>6. Wir leisten Gewährleistung nach den gesetzlichen Rechten.</p>
<p>
	6.1 Weine können Weinstein ausscheiden. Dieses sind kleine Kristalle, die geschmacksneutral sind.
	Diese Weinsteinausscheidung hat keine negative Auswirkung auf Qualität, Geschmack und Haltbarkeit
	des Weines und ist kein Grund zur Reklamation.
</p>
<h3>Lieferung</h3>
<p>
	<span style="color:red">Wir liefern per ...</span>
</p>
<h3>Zahlung</h3>
<p>
	Lieferung erfolgt gegen Vorauskasse unter Angabe der Auftragsnummer auf folgendes Konto:<br />
	<span style="color:red">IBAN DE03 9999 7777 3333 5555 22</span>
</p>
