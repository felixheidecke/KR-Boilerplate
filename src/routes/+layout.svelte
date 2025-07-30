<script lang="ts">
	import '$lib/styles/styles.scss'
	import messages from '$lib/messages'
	import type { XioniShop } from '$lib/boilerplate/xioni/types.js'
	import { CART } from '$lib/stores'

	const { data, children } = $props()

	import MessageBus from '$lib/boilerplate/components/MessageBus/MessageBus.svelte'
	import Nav from '$lib/boilerplate/components/Nav/Nav.svelte'
	import Toplink from '$lib/boilerplate/components/Toplink/Toplink.svelte'
	import Wrapper from '$lib/boilerplate/components/Wrapper/Wrapper.svelte'
	import type { NavProps } from '$lib/boilerplate/components/Nav/Nav.js'
	import { Link } from '$lib/boilerplate/components'

	function mapGroupToRoutes(groups: XioniShop.Group[]): NavProps['routes'] {
		return groups.map(group => ({
			name: group.name,
			path: [group.slug, 'c', group.id].join('-'),
			routes: mapGroupToRoutes(group.subgroups || [])
		}))
	}

	const routes = $derived([
		...mapGroupToRoutes(data.groups),
		{
			name: 'Website',
			class: 'Nav__item--website',
			path: 'https://web.de',
			routes: [
				{
					name: 'AGB',
					path: '/agb'
				},
				{
					name: 'Widerrufsrecht',
					path: '/widerrufsrecht'
				}
			]
		}
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
	<Wrapper tag="header" class="$mb-2">
		<h1>
			<Link to="/" rel="follow" class="$decoration-none">Webshop</Link>
		</h1>

		<Link to="/checkout" fontello="basket"
			>Warenkorb
			{#if !!$CART.products.length}({$CART.products.length}){/if}
		</Link>

		<hr />
	</Wrapper>

	<Nav class="product-nav" {routes} />

	<Wrapper tag="main">
		{@render children?.()}
	</Wrapper>
</div>

<MessageBus {messages} />
<Toplink />
