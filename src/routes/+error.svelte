<script>
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	if (browser && !$page.url.searchParams.has('error')) {
		goto('?error=' + $page.status)
	}
</script>

<div class="$text-center">
	<h3>🥵 Fehler {$page.status} ist aufgetreten!</h3>
	<hr />

	<p class="$font-large">{$page.error.message}</p>

	<hr />

	<p>
		<strong>Ist aber nicht so schlimm.</strong><br />
		Kehren Sie einfach wieder zur <Link to="/">Startseite</Link> zurück.<br />
		Dort geht es weiter, als sei nichts geschehen.
	</p>
</div>

<style>
	hr {
		max-width: 26rem;
		margin: 0 auto;
	}
</style>
