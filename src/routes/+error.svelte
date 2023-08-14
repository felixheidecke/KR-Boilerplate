<script>
	import { page } from '$app/stores'
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

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
