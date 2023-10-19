<script lang="ts">
	import { CART } from '../stores'
	import { Cart } from '../api'
	import messages from '$lib/messages'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import CartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'

	// -----------------------------------------------------------------------------------------------

	let isLoading: boolean = false

	async function updateCart(id: number, quantity: number) {
		isLoading = true

		const [cart, error] = await Cart.updateItemQuantity(id, quantity)

		if (error) {
			messages.add(error.data.message, { type: 'error' })
		} else {
			CART.set(cart)
		}

		isLoading = false
	}
</script>

<h1>Warenkorb</h1>
<Client browser>
	{#if !$CART.products?.length}
		<h4>Ihr Warenkorb ist noch leer.</h4>
		<Link to="/shop" icon="fas fa-store">Zum Shop</Link>
	{:else}
		<CartTable
			products={$CART.products}
			supplementalCost={$CART.supplementalCost}
			shippingCost={$CART.shippingCost}
			total={$CART.total}
			quantitySelector
			readOnly={isLoading}
			on:product-quantity-update={({ detail }) => updateCart(detail.productId, detail.quantity)} />

		<div class="$mt-2">
			<Button icon="fas fa-angle-left" to="/shop">zurück zum Shop</Button>
			<Button
				icon="fas fa-angle-right"
				class="Button--primary $float-right $row-reverse"
				to="/shop/checkout/address">weiter zur Kasse</Button>
		</div>
	{/if}
</Client>
