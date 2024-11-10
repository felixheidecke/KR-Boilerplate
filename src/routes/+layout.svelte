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
	<meta property="og:url" content="https://{stammdaten.web}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={stammdaten.title} />
	<meta property="og:description" content="[...]" />
	<meta property="og:image" content="/meta/og-image.jpg" />
</svelte:head>

<div data-layout={$page.data.layout}>
	<Nav {routes} sticky />
	<Wrapper tag="main">
		<PageTransition>
			<slot />
		</PageTransition>
	</Wrapper>
</div>

<MessageBus {messages} />
<Toplink />

<style lang="scss">
	@use '$styles/colors' as colors;

	:global(body) {
		background-color: colors.$dark;
		color: colors.$light;
	}
</style>
