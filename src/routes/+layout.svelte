<script>
	import '$lib/boilerplate/styles/style.scss'
	import '$lib/styles/style.scss'
	import { ROUTES, ACTIVE_ROUTE, ACTIVE_PARENT } from '$lib/boilerplate/stores/routes'
	import stammdaten from '$lib/stammdaten'

	const { url } = $$props.data
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

<main class="layout-wrapper $mx-auto $p $p-2@tablet-up">
	<PageTransition path={url.pathname}>
		<slot />
	</PageTransition>
</main>

<Toplink />

<style lang="scss">
	@import '$variables';
	.layout-wrapper {
		max-width: 36rem;

		@include breakpoint('tablet-up') {
			max-width: 84rem;
		}
	}
</style>
