<script>
	import '$lib/styles/styles.scss'

	import routes from '$routes'
	import stammdaten from '$stammdaten'
	import messages from '$lib/messages'
	import { page } from '$app/stores'
	import { head } from 'lodash-es'
</script>

<svelte:head>
	<meta name="theme-color" content="#333" />
	<meta name="thumbnail" content="https://{stammdaten.web}/meta/og-image.jpg" />
	<meta property="og:url" content="https://{stammdaten.web}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={stammdaten.title} />
	<meta property="og:description" content="[...]" />
	<meta property="og:image" content="https://{stammdaten.web}/meta/og-image.jpg" />
</svelte:head>

<div data-layout="root">
	<Nav {routes} sticky />
	<Wrapper tag="main">
		<slot />
	</Wrapper>
</div>

<MessageBus {messages} />
<Toplink />
