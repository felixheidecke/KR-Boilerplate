<script>
	import '$lib/styles/styles.scss'

	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	if (browser && !$page.url.searchParams.has('error')) {
		goto('?error=' + $page.status)
	}
</script>

<div data-layout="error">
	<div class="$text-center">
		{#if $page.status === 404}
			<h3>Leider wurde diese Seite nicht gefunden!</h3>
		{:else}
			<h3>
				🥵 Fehler {$page.status} ist aufgetreten!
			</h3>
			<p class="$font-large">
				{$page.error?.message || 'Error'}
			</p>
		{/if}
		<hr />
		<p>
			<strong>Ist aber nicht so schlimm.</strong>
		</p>
		<p>
			Kehren Sie einfach wieder zur <Link to="/">Startseite</Link> zurück.<br />
			Dort geht es weiter, als sei nichts geschehen.
		</p>
		<hr />
	</div>
</div>

<style>
	hr {
		max-width: 26rem;
		margin: 0 auto;
	}

	[data-layout] {
		display: grid;
		place-items: center;
		height: 80vh;
	}
</style>
