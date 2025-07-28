<script lang="ts">
	import '$lib/styles/styles.scss'
	import messages from '$lib/messages'
	import type { XioniShop } from '$lib/boilerplate/xioni/types.js'

	const { data, children } = $props()

	import MessageBus from '$lib/boilerplate/components/MessageBus/MessageBus.svelte'
	import Nav from '$lib/boilerplate/components/Nav/Nav.svelte'
	import Toplink from '$lib/boilerplate/components/Toplink/Toplink.svelte'
	import Wrapper from '$lib/boilerplate/components/Wrapper/Wrapper.svelte'
	import type { NavProps } from '$lib/boilerplate/components/Nav/Nav.js'

	function mapGroupToRoutes(groups: XioniShop.Group[]): NavProps['routes'] {
		return groups.map(group => ({
			name: group.name,
			path: [group.slug, 'c', group.id].join('-'),
			routes: mapGroupToRoutes(group.subgroups || [])
		}))
	}

	const routes = $derived([
		{
			name: 'Home',
			class: 'nav__item--home',
			path: '/'
		},
		...mapGroupToRoutes(data.groups)
	])
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
	<Nav {routes} />
	<Wrapper tag="main">
		{@render children?.()}
	</Wrapper>
</div>

<MessageBus {messages} />
<Toplink />
