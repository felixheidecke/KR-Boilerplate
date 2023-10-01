<script lang="ts">
	import { CART } from '../stores'
	import { Cart } from '../api'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import XioniShopCartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'

	// -----------------------------------------------------------------------------------------------

	let isLoading: boolean = false
	const module: number = $$props.data.module

	async function updateCart(id: number, quantity: number) {
		isLoading = true
		const [error, cart] = await Cart.updateItemQuantity(id, quantity)

		if (error) {
			console.error(error)
			return
		}

		CART.set(cart)
		isLoading = false
	}
</script>

<h1>Warenkorb</h1>
<Client browser>
	{#if !$CART.products.length}
		<h4>Ihr Warenkorb ist noch leer.</h4>
		<Link to="/shop" icon="fas fa-store">Zum Shop</Link>
	{:else}
		<XioniShopCartTable
			products={$CART.products}
			supplementalCost={$CART.supplementalCost}
			shippingCost={$CART.shippingCost}
			total={$CART.total}
			quantitySelector
			readOnly={isLoading}
			on:product-quantity-update={({ detail }) => updateCart(detail.productId, detail.quantity)} />

		<Button to="/shop/checkout/address">Weiter zur Kasse</Button>
	{/if}
</Client>
