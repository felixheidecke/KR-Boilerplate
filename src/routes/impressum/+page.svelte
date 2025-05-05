<script>
	import stammdaten from '$lib/stammdaten'
</script>

<svelte:head>
	<title>Impressum | {stammdaten.title}</title>
</svelte:head>

<h1>Impressum</h1>

<Address {...stammdaten} />

<h3>Haftungshinweis</h3>
<p>
	Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer
	Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
</p>
<h3>Streitschlichtung</h3>
<p>
	Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <Link
		to="https://ec.europa.eu/consumers/odr" />. Wir sind nicht bereit oder verpflichtet, an
	Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
</p>
<h3>Webdesign, Programmierung:</h3>
<p>
	<strong>klickrhein</strong>, Frank Förster
	<br />
	<Link to="https://www.klickrhein.de" title="klickrhein, Webagentur in Oestrich-Winkel" />
	| <Mail to="info@klickrhein.de" />
</p>
