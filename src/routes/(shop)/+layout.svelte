<script>
	import '$lib/styles/shop.scss'

	import routes from '$routes'
	import stammdaten from '$stammdaten'
	import messages from '$lib/messages'
	import cdnPath from '$lib/utils/cdnPath'

	import MessageBus from '$lib/boilerplate/components/MessageBus/MessageBus.svelte'
</script>

<svelte:head>
	<meta name="theme-color" content="#333" />
	<meta property="og:url" content="https://{stammdaten.web}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={stammdaten.title} />
	<meta property="og:description" content="[...]" />
	<meta property="og:image" content="{cdnPath}/_meta/og-image.jpg" />
</svelte:head>

<div id="shop-layout">
	<MessageBus {messages} />
	<Nav {routes} sticky />
	<main class="wrapper">
		<slot />
	</main>
</div>
<Toplink />
