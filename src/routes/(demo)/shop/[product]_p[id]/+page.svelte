<script lang="ts">
	import { CART } from '../_stores/cart'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import XioniShopProduct from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'
	import type { ShopProduct } from '$lib/boilerplate/libraries/xioni-shop/products.types'

	const product: ShopProduct | undefined = $$props.data.product
</script>

<Client browser>
	{#if product}
		<XioniShopProduct {product} on:addToCart={({ detail: id }) => CART.addToCart(id)} />

		<div class="$text-center">
			<Link icon="fas fa-reply" on:click={() => history.back()}>Zurück</Link>
		</div>
	{/if}
</Client>
