<script lang="ts">
	import stammdaten from '$stammdaten'
	import { CART } from '../shop.api'
	import { page } from '$app/stores'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import MiniCart from '$lib/boilerplate/components/XioniShopMiniCart/XioniShopMiniCart.svelte'
	import ShopNav from '$lib/boilerplate/components/XioniShopNav/XioniShopNav.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	// -----------------------------------------------------------------------------------------------

	$: cart = $CART.data
	$: groups = data.groups
	$: activeGroup = $page.data.group
</script>

<svelte:head>
	<title>{stammdaten.name} Online Shop</title>
</svelte:head>

<Client browser>
	<Grid gap={2} tag="section" class="$flex-column@tablet-down">
		<Grid size="desktop-1-4" tag="aside" class="$order-1@tablet-down">
			<div class="sidebar">
				{#if cart.products?.length}
					<MiniCart {cart} />
					<Button
						icon="fas fa-shopping-cart"
						to="/warenkorb"
						class="$mt $w-full $content-center $font-small">Zum Warenkorb</Button>
					<hr />
				{/if}
				<h4 class="$hidden@tablet-down">Kategorien:</h4>
				<ShopNav {groups} {activeGroup} />
			</div>
		</Grid>
		<Grid size="desktop-3-4" tag="main" class="$order-2@tablet-down">
			<slot />
		</Grid>
	</Grid>
</Client>
