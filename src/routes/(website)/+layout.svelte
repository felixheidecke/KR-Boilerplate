<script>
	import '$lib/styles/website.scss'

	import routes from '$routes'
	import stammdaten from '$stammdaten'
	import cdnPath from '$lib/utils/cdnPath'
</script>

<svelte:head>
	<meta name="theme-color" content="#333" />
	<meta property="og:url" content="https://{stammdaten.web}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={stammdaten.title} />
	<meta property="og:description" content="[...]" />
	<meta property="og:image" content="{cdnPath}/_meta/og-image.jpg" />
</svelte:head>

<div id="website-layout">
	<Nav {routes} sticky />
	<main class="wrapper">
		<PageTransition>
			<slot />
		</PageTransition>
	</main>
</div>
<Toplink />
