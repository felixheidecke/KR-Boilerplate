<script lang="ts">
	import { Cart } from '../../api'
	import { onDestroy, onMount } from 'svelte'
	import messages from '$lib/messages'
	import stammdaten from '$stammdaten'

	import type { XioniFetchErrorResponse } from '$lib/boilerplate/xioni/utils/xioniFetch'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Product from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'
	import { CART } from '../../stores'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	const { product } = data

	// -----------------------------------------------------------------------------------------------

	Cart.$event
		.on('success', cart => {
			messages.reset()
			CART.set(cart)
		})
		.on('error', error => {
			messages.add(error.data.message, undefined, { type: 'error' })
		})

	onDestroy(() => Cart.$event.removeAllListeners())
</script>

<svelte:head>
	<meta name="description" content="Kaufen Sie {product.name} in unserem Online Shop." />
	<title>{product.name} | {stammdaten.name} Online Shop</title>
</svelte:head>

{#if product}
	<Product {product} on:addToCart={({ detail: id }) => Cart.addItem(id)} />

	<div class="$text-center">
		<Link icon="fas fa-reply" on:click={() => history.back()}>Zurück</Link>
	</div>
{/if}
