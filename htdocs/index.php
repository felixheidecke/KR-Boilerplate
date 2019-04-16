<!DOCTYPE html>
<html lang="de">
<!--  klickrhein, Frank Förster, Oestrich-Winkel, Tel. 06723-3410, www.klickrhein.de  -->
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="" />
	<title>Ferienwohnung Familie Weber in Oestrich-Winkel, Stadtteil Mittelheim</title>
	<!-- Favicon -->
	<link rel="icon" type="image/png" href="images/favicon.png" />
	<link rel="apple-touch-icon" type="image/png" href="images/favicon.png" />
	<!-- Stylesheets -->
	<link rel="stylesheet" href="css/style.css" />
</head>
<body hidden>
	<div class="main wrapper">
		<header class="header pure-g">
			<div class="pure-u-1">
				<h2><a href="/">Die Ferienwohnung an der Basilika in Mittelheim</a></h2>
			</div>
			<div class="pure-u-1">
				<img alt="Ferienwohnung Familie Weber in Mittelheim" class="pure-img" src="images/start.jpg">
			</div>
		</header>
		<main class="main pure-g">
			<article class="article pure-u-1">
				<h1>Herzlich Willkommen bei Familie Weber</h1>
				<p>Sie möchten Urlaub machen?! Und sich ein paar stressfreie Tage gönnen, dann besuchen Sie unseren schönen Rheingau gelegen am Mittelrhein. Am Tor zum UNESCO-Welterbe Oberes Mittelrheintal.</p>
				<p>Naturverbundene Gäste und Wanderer lieben den Rheingau, die natürliche liebreizende Landschaft, die Gastfreundschaft und die Kontaktfreude seiner Bewohner zeichnen den Rheingau aus!</p>
				<h4>Was ist ein Urlaub in Oestrich-Winkel Stadtteil Mittelheim?</h4>
				<p>Sei es eine Radtour durch Weinberge oder entlang des Rheins! Oder sie wandern über den Rheinsteig, einen Fernwanderweg, der sich von Region zu Region über eine Gesamtlänge von 320 Km erstreckt von Wiesbaden bis Bonn. Oder sie erkunden unsere, in den Weinbergen verlaufenden Flötenwege mit Rheinblick. Sie bieten Natur und Aussicht pur! Schloss Vollrads, sowie Schloss Johannisberg befinden sich auf ihrer Route, und wie sagte schon Goethe? &quot;Hier bin ich Mensch hier will ich sein!&quot;</p>
				<div class="kontakt">
					<h2>Kontakt</h2>
					<p>Jutta Weber<br>
					An der Basilika 10<br>
					65375 Oestrich-Winkel</p>
					<h3>Telefon 06723 - 1882<br>
					Mobil 0172 - 6901456</h3>
					<p>Email: <span data-mailto>fewo_weber[at]alice[dot]de</span></p>
				</div>
				<h3>Lage</h3>
				<p>Unser Haus liegt im Stadtteil Mittelheim zentral und romantisch gelegen direkt an der Basilika<br>
				(ohne Uhrschlagwerk).</p>
				<p>Bahnhof 6 Gehminuten und Bus 4 Minuten entfernt. Sowie in die Weinberge 10 Minuten und zum Rhein 6 Minuten, ihr Ausgangspunkt für viele diverse Touren. Auch laden die Städte Frankfurt 50 Km, Wiesbaden 24 Km, sowie Mainz 24 Km, zum Bummeln und zum Verweilen ein! Auch Rüdesheim 8 km lockt jährlich viele Besucher mit seiner weltbekannten Drosselgasse, Lokalen, Tanzlokale, und einer Seilbahn, die sie zum Niederwalddenkmal geradezu über die Weinberge schweben lässt!</p>
				<p>Natürlich sollte man die Straußwirtschaften und Gutschänken bei einem Besuch in unserer Region nicht versäumen! Hier kann man ein großes Sortiment an Weinen genießen.</p>
				<h3>Ausstattung</h3>
				<p>Unsere Ferienwohnung, 50 qm, gemütlich und zweckmäßig ausgestattet für 2 Personen, NR, Wohnküche, Schlafzimmer, Sat- TV, WLAN, Bad, Dusche, WC, Waschmaschine.</p>
				<p>Liebevoll ausgestattet, ausgelegt für 2 Personen.</p>
				<p>Inklusive Bettwäsche und Handtücher</p>
				<p>Vermietung ab 3 Tage möglich</p>
				<p>Fahrradverleih täglich 6,- EUR pro Stück, Haustiere auf Anfrage!</p>
				<h4>Keine Studenten</h4>
				<h3>Unsere Preise</h3>
				<p>52,- EUR pro Tag inkl. Endreinigung</p>
				<p>Auf ihren Besuch freut sich</p>
				<h4>Ihre Familie Weber</h4>
				<section class="galerie pure-u-1" id="galerie">
					<div class="pure-g">
						<div class="pure-u-sm-1-2 pure-u-md-1-4" v-for="(image, index) in images">
							<a :href="path(index, 'gr')" :data-lightbox="name" :data-title="image"><img class="pure-img" :src="path(index)"></a>
						</div>
					</div>
				</section>
				<p><a class="kr-button" href="datenschutz.php">Datenschutzhinweise</a></p>
			</article>
		</main>
	</div>
	<script data-main="js/default.js" src="https://cdn.klickrhein.de/libs/require.js/2.3.6/require.min.js"></script>
</body>
</html>