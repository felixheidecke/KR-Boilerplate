<script lang="ts">
	import '$lib/styles/styles.scss'
	import { CART } from '$lib/stores'
	import linkedData from '$lib/linkedData'
	import messages from '$lib/messages'
	import stammdaten from '$stammdaten'
	import type { NavProps } from '$lib/boilerplate/components/Nav/Nav.js'
	import type { XioniShop } from '$lib/boilerplate/xioni/types.js'

	const { data, children } = $props()

	// --- Components --------------------------------------------------------------------------------

	import { Link } from '$lib/boilerplate/components'
	import MessageBus from '$lib/boilerplate/components/MessageBus/MessageBus.svelte'
	import Nav from '$lib/boilerplate/components/Nav/Nav.svelte'
	import Toplink from '$lib/boilerplate/components/Toplink/Toplink.svelte'
	import Wrapper from '$lib/boilerplate/components/Wrapper/Wrapper.svelte'
	import LinkedData from '$lib/boilerplate/components/LinkedData/LinkedData.svelte'

	function mapGroupToRoutes(groups: XioniShop.Group[]): NavProps['routes'] {
		return groups.map(group => ({
			name: group.name,
			path: [group.slug, 'c', group.id].join('-'),
			routes: mapGroupToRoutes(group.subgroups || [])
		}))
	}

	const routes = $derived([
		{
			name: 'Startseite',
			class: 'Nav__item--startpage',
			path: '/'
		},
		...mapGroupToRoutes(data.groups),
		{
			class: 'Nav__item--website',
			routes: [
				{
					name: 'AGB',
					path: '/agb'
				},
				{
					name: 'Widerrufsrecht',
					path: '/widerrufsrecht'
				},
				{
					name: 'Impressum',
					path: '/impressum'
				},
				{
					name: 'example.com',
					path: 'https://example.com'
				}
			]
		}
	])
</script>

<svelte:head>
	<meta name="theme-color" content="#333" />
	<meta name="thumbnail" content="https://{stammdaten.web}/meta/og-image.jpg" />
	<meta property="og:url" content="https://{stammdaten.web}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={stammdaten.title} />
	<meta property="og:description" content="[...]" />
	<meta property="og:image" content="https://{stammdaten.web}/meta/og-image.jpg" />
	<LinkedData data={linkedData} />
</svelte:head>

<div data-layout>
	<header>Shop Header</header>
	<Wrapper size="large">
		<Link to="/checkout" fontello="basket"
			>Warenkorb
			{#if !!$CART.products.length}({$CART.products.length}){/if}
		</Link>
	</Wrapper>
	<Wrapper size="large" tag="main">
		<Nav class="product-nav" {routes} />
		<main>{@render children?.()}</main>
	</Wrapper>
	<footer>Footer</footer>
</div>
<MessageBus {messages} />
<Toplink />

<style lang="scss">
	@use '$styles/colors';

	hr {
		border-top: 1px solid colors.$gray;
	}
</style>
