<script>
	import '$lib/boilerplate/styles/style.scss'
	import '$lib/styles/style.scss'

	import routes from '$routes'
	import stammdaten from '$stammdaten'
	import MESSAGES from '$lib/messages'
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
	<Nav {routes} />
</header>
<Container>
	<slot />
</Container>
<Client browser>
	<Toplink />
	<MessageBus messages={MESSAGES} />
</Client>
