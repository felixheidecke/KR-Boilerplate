<script>
	import '$lib/boilerplate/styles/style.scss'
	import '$lib/styles/style.scss'
	import { ROUTES, ACTIVE_ROUTE } from '$lib/boilerplate/stores/routes'

	const { title, web } = $$props.data.stammdaten
</script>

<svelte:head>
	<meta name="theme-color" content="#333" />
	<meta property="og:url" content={web} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content="…" />
	<meta property="og:image" content="…" />
</svelte:head>

<header>
	<Nav routes={$ROUTES} activeRoute={$ACTIVE_ROUTE} />
</header>

<main class="layout-wrapper $mx-auto $p-2">
	<PageTransition path={$$props.data.url.pathname}>
		<slot />
	</PageTransition>
</main>

<style>
	.layout-wrapper {
		max-width: 60rem;
	}
</style>
