<script>
	import '$lib/styles/shop.scss'

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

<Nav {routes} sticky />
<MessageBus {messages} />
<Wrapper id="shop-layout">
	<slot />
</Wrapper>
<Toplink />
