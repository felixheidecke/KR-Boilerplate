<script lang="ts">
	import { CART } from '../shopApi'
	import { onDestroy } from 'svelte'
	import messages from '$lib/messages'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import CartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'

	// -----------------------------------------------------------------------------------------------

	$: ({ products, supplementalCost, shipping, total } = $CART.data)

	async function updateItemQuantity({ detail }: any) {
		CART.updateItemQuantity(detail.productId, detail.quantity)
	}

	const unsubscribe = CART.subscribe(({ errors }) => {
		if (errors) {
			messages.add(errors.data.message, undefined, { type: 'error' })
		} else {
			messages.reset()
		}
	})

	onDestroy(unsubscribe)
</script>

<h1>Warenkorb</h1>
<Client browser>
	{#if !products?.length}
		<h4>Ihr Warenkorb ist noch leer.</h4>
		<Link to="/shop" icon="fas fa-store">Zum Shop</Link>
	{:else}
		<CartTable
			{products}
			{supplementalCost}
			{shipping}
			{total}
			quantitySelector
			readOnly={$CART.isLoading}
			on:product-quantity-update={updateItemQuantity} />

		<div class="$mt-2">
			<Button icon="fas fa-angle-left" to="/shop">zurück zum Shop</Button>
			<Button
				icon="fas fa-angle-right"
				class="Button--primary $float-right $row-reverse"
				to="/checkout/address">weiter zur Kasse</Button>
		</div>
	{/if}
</Client>
