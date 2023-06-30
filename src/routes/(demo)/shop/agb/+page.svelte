<script>
	import Address from '$lib/boilerplate/components/Address/Address.svelte'

	const { stammdaten, info } = $$props.data

	const shippingRates = info.shippingRates || []
	const shippingCharges = info.shippingCharges
	const freeShippingThreshold = info.shippingCharges?.freeShippingThreshold
	const additionalCost = info.shippingCharges?.additionalCost
</script>

<svelte:head>
	<title>Allgemeine Geschäftsbedingungen</title>
	<meta name="robots" content="noindex" />
</svelte:head>

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
	b. Wenn Sie die Produkte im Warenkorb kaufen wollen, klicken Sie auf <Link
		to="/shop/checkout/cart">den Warenkorb</Link
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

{#if shippingRates.length}
	<h4>Versandkosten</h4>

	{#if info.shippingCharges}
		{@html info.shippingCharges.description}
	{/if}

	<ol style="list-style: disc;" class="$pl-2">
		{#each shippingRates as { weight, price }}
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
{/if}

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
<h3>Jugendschutz</h3>
<p>
	Nach §9 des Jugendschutzgesetzes ist es untersagt, Branntwein, branntweinhaltige Getränke oder
	Lebensmittel, die Branntwein in nicht nur geringer Menge enthalten, an Kinder und Jugendliche
	abzugeben. Nach §9 des JuSchG ist darüber hinaus auch untersagt, andere alkoholische Getränke an
	Kinder und Jugendliche unter 16 Jahren abzugeben (so z.B. Wein, Bier und Sekt). Mit Anerkennung
	der AGB bestätigen Sie, dass Sie mindestens 16 Jahre (Bestellung von Wein und Sekt) bzw. 18 Jahre
	(Bestellung von Spirituosen) alt sind.
</p>

<h2>Widerrufsbelehrung</h2>
<h3>Widerrufsrecht</h3>
<p>
	Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
</p>
<p>
	Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter
	Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
</p>
<p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>

<Address {...stammdaten} email={undefined} web={undefined} />

<p>
	mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail)
	über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte
	Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
</p>
<p>
	Sie können das Muster-Widerrufsformular oder eine andere eindeutige Erklärung downloaden,
	ausfüllen und übermitteln. Machen Sie von dieser Möglichkeit Gebrauch, so werden wir Ihnen
	unverzüglich (z. B. per E-Mail) eine Bestätigung über den Eingang eines solchen Widerrufs
	übermitteln.
</p>
<p>
	Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
	Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
</p>
<h3>Folgen des Widerrufs</h3>
<p>
	Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten
	haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus
	ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste
	Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
	zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
	Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen
	Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart;
	in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. Wir können die
	Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis
	erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt
	ist. Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem
	Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu
	übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen
	absenden. Sie tragen die unmittelbaren Kosten der Rücksendung der Waren. Sie müssen für einen
	etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der
	Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen
	zurückzuführen ist.
</p>
<p>
	<Link to="pdf/MusterWiderrufsformular.pdf" icon="fas fa-file-pdf" target="_blank"
		>Widerrufsformular</Link>
</p>
<p><em>Ende der Widerrufsbelehrung</em></p>
