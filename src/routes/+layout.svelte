<script>
	import '$lib/boilerplate/styles/style.scss'
	import '$lib/styles/style.scss'

	import { page } from '$app/stores'
	import { ROUTES, ACTIVE_ROUTE, ACTIVE_PARENT } from '$lib/boilerplate/stores/routes'
	import stammdaten from '$lib/stammdaten'
</script>

<svelte:head>
	<meta name="theme-color" content="#333" />
	<meta property="og:url" content="https://{stammdaten.web}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={stammdaten.title} />
	<meta property="og:description" content="…" />
	<meta property="og:image" content="/images/og-image.jpg" />
</svelte:head>

<header>
	<Nav routes={$ROUTES} activeRoute={$ACTIVE_ROUTE} activeParent={$ACTIVE_PARENT} />
</header>

<main>
	<PageTransition path={$page.url.pathname}>
		<slot />
	</PageTransition>
</main>
<Toplink />

<style>
	main {
		max-width: 80rem;
		margin: 0 auto;
	}
</style>
