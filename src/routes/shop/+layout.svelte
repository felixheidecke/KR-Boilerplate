<script>
	import '$lib/styles/styles.scss'

	import routes from '$routes'
	import stammdaten from '$stammdaten'
	import messages from '$lib/messages'
</script>

<svelte:head>
	<meta name="theme-color" content="#333" />
	<meta property="og:url" content="https://{stammdaten.web}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={stammdaten.title} />
	<meta property="og:description" content="[...]" />
	<meta property="og:image" content="/meta/og-image.jpg" />
</svelte:head>

<div id="shop-layout">
	<Nav {routes} sticky />
	<Wrapper tag="main">
		<PageTransition>
			<slot />
		</PageTransition>
	</Wrapper>
</div>

<MessageBus {messages} />
<Toplink />
