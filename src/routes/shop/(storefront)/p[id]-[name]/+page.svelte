<script lang="ts">
	import { beforeNavigate } from '$app/navigation'
	import messages from '$lib/messages'
	import Shop, { CART } from '../../ShopApi'
	import stammdaten from '$stammdaten'

	import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'
	import type { XioniFetchErrorResponse } from '$lib/boilerplate/xioni/utils/xioniFetch'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Product from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	const { product } = data

	// -----------------------------------------------------------------------------------------------

	function successHandler(cart: XioniShop.Cart) {
		messages.reset()
		CART.set(cart)
	}

	function errorHandler(error: XioniFetchErrorResponse) {
		messages.add(error.data.message, undefined, { type: 'error' })
	}

	Shop.cart.$event.on('success', successHandler).on('error', errorHandler)

	beforeNavigate(() => {
		Shop.cart.$event.off('success', successHandler).off('error', errorHandler)
	})
</script>

<svelte:head>
	<meta name="description" content="Kaufen Sie {product.name} in unserem Online Shop." />
	<title>{product.name} | {stammdaten.name} Online Shop</title>
</svelte:head>

{#if product}
	<Product {product} on:addToCart={({ detail: id }) => Shop.cart.addItem(id)} />

	<div class="$text-center">
		<Link icon="fas fa-reply" on:click={() => history.back()}>Zurück</Link>
	</div>
{/if}
