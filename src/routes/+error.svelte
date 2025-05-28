<script lang="ts">
	import '$lib/styles/styles.scss'

	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'

	if (browser && !$page.url.searchParams.has('error')) {
		goto('?error=' + $page.status)
	}

	const status = $page.status || 500
	const message = $page.error?.message || 'Ein Fehler ist aufgetreten'
</script>

<div data-error>
	<div class="$text-center">
		<Message title="🥵 Ups…" type="error">
			<em>
				{#if status === 404}
					Die Seite wurde nicht gefunden.
				{:else if status === 400}
					Fehlerhafte Eingabe
				{:else}
					Ein interner Fehler ist aufgetreten
				{/if}
			</em>
		</Message>
		<p>
			<Link to="/">Zur Startseite</Link>.
		</p>
		<hr />
		<p>
			<small>{message}</small>
		</p>
	</div>
</div>

<style>
	hr {
		max-width: 26rem;
		margin: 0 auto;
	}

	[data-error] {
		display: grid;
		place-items: center;
		height: 80vh;
	}
</style>
