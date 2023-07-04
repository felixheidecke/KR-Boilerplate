<script lang="ts">
	import { CART } from '../../_stores'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import XioniShopCartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'

	$: ({ products, additionalCost, shipping, total } = $CART)
</script>

<h1>Warenkorb</h1>
<Client browser>
	{#if !products.length}
		<h4>Ihr Warenkorb ist noch leer.</h4>
		<Link to="/shop" icon="fas fa-store">Zum Shop</Link>
	{:else}
		<XioniShopCartTable
			{products}
			{additionalCost}
			{shipping}
			{total}
			quantitySelector
			on:product-quantity-update={({ detail }) =>
				CART.updateItemQuantity(detail.productId, detail.quantity)} />

		<Button to="/shop/checkout/address">Weiter zur Kasse</Button>
	{/if}
</Client>
