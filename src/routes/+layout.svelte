<script lang="ts">
	import '$lib/styles/styles.scss'
	import messages from '$lib/messages'
	import type { XioniShop } from '$lib/boilerplate/xioni/types.js'
	import linkedData from '$lib/linkedData'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import {
		LinkedData,
		MessageBus,
		Nav,
		type NavProps,
		Toplink,
		Wrapper
	} from '$lib/boilerplate/components'

	// --- [ Setup ] ---------------------------------------------------------------------------------

	const { data, children } = $props()

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
	<meta name="theme-color" content="#6e767e" />
	<meta property="og:url" content="https://example.com" />
	<meta property="og:type" content="shop" />
	<meta property="og:title" content="" />
	<meta property="og:description" content="" />
	<meta property="og:image" content="/meta/og-image.jpg" />
	<meta name="thumbnail" content="/meta/og-thumb.png" />
	<LinkedData data={linkedData} />
</svelte:head>

<div data-layout="root">
	<Header />
	<Wrapper tag="main" size="large">
		<Nav class="product-nav" {routes} />
		{@render children?.()}
	</Wrapper>
	<Footer />
</div>
<MessageBus {messages} />
<Toplink />
