<script>
	import '$lib/styles/styles.scss'

	import messages from '$lib/messages'
	import { page } from '$app/stores'
	import { head } from 'lodash-es'
</script>

<svelte:head>
	<meta name="theme-color" content="#333" />
	<meta name="thumbnail" content="/meta/og-image.jpg" />
	<meta property="og:url" content="https://}" />
	<meta property="og:type" content="shop" />
	<meta property="og:title" content="Webshop" />
	<meta property="og:description" content="[...]" />
</svelte:head>

<div data-layout="root">
	<Wrapper tag="main">
		<slot />
	</Wrapper>
</div>

<MessageBus {messages} />
<Toplink />
