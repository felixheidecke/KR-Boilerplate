<script>
	import stammdaten from '$lib/stammdaten'

	const { title } = stammdaten
</script>

<svelte:head>
	<title>Widerrufsbelehrung | {title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<h2>Widerrufsbelehrung</h2>
<h3>Widerrufsrecht</h3>
<p>
	Sie haben das Recht, binnen vierzehn Tagen ohne Angaben von Gründen diesen Vertrag zu widerrufen.
</p>
<p>
	Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter
	Dritter, der nicht Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
</p>
<p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>
<Address {...stammdaten} />
<p>
	(z.B. ein mit der Post versandter Brief, Telefax oder E-Mail) über Ihren Entschluss, diesen
	Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte <Link
		to="/pdf/MusterWiderrufsformular.pdf">Muster-Widerrufsformular</Link> verwenden, das jedoch nicht
	vorgeschrieben ist.
</p>
<p>
	Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
	Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
</p>
<h3>Folgen des Widerrufs</h3>
<p>
	Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten
	haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus
	ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstige
	Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
	zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrages bei uns eingegangen
	ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen
	Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart;
	in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
</p>
<p>
	Wir können die Rückzahlung verweigern, bis wir die Ware wieder zurückerhalten haben oder bis Sie
	den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der
	frühere Zeitpunkt ist.
</p>
<p>
	Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an
	dem Sie uns über den Widerruf dieses Vertrages unterrichten, an uns zurückzusenden oder zu
	übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen
	absenden.
</p>
<p>Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.</p>
<p>
	Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf
	einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen
	Umgang mit ihnen zurückzuführen ist.
</p>
<p>
	(2) Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Ton- oder Videoaufnahmen oder
	Computersoftware in einer versiegelten Packung, wenn die Versiegelung nach der Lieferung entfernt
	wurde.
</p>
<p>
	<Link to="/pdf/MusterWiderrufsformular.pdf" fontello="file-pdf">Widerrufsformular</Link>
</p>
<em>Ende der Widerrufsbelehrung</em>
