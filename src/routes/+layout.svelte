<script>
	import '$lib/boilerplate/styles/style.scss'
	import '$lib/styles/style.scss'

	import { ROUTES, ACTIVE_ROUTE } from '$lib/routes/routes'
</script>

<nav>
	<Nav routes={$ROUTES} activeRoute={$ACTIVE_ROUTE} />
</nav>
<main class="layout-wrapper">
	<slot />
</main>

<style>
	.layout-wrapper {
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem;
	}
</style>
