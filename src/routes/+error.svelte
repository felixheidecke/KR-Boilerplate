<script>
	import '$lib/styles/website.scss'
	import { page } from '$app/stores'
	import routes from '$routes'
</script>

<div id="error-layout">
	<div class="$text-center">
		{#if $page.status === 404}
			<h3>Leider wurde diese Seite nicht gefunden!</h3>
		{:else}
			<h3>
				🥵 Fehler {$page.status} ist aufgetreten!
			</h3>
			<p class="$font-large">
				{$page.error.message}
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
		<ul>
			{#each routes as route}
				<li class="$mt">
					<Link to={route.path} target={route.target}>{route.name}</Link>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	hr {
		max-width: 26rem;
		margin: 0 auto;
	}

	#error-layout {
		display: grid;
		place-items: center;
		height: 80vh;
	}
</style>
