<script lang="ts">
	import { CART } from '../stores'
	import { Cart } from '../api'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import CartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'

	// -----------------------------------------------------------------------------------------------

	let isLoading: boolean = false

	function updateCart(id: number, quantity: number) {
		isLoading = true

		Cart.updateItemQuantity(id, quantity)
		Cart.$event
			.once('updated', cart => {
				isLoading = false
				CART.set(cart)
			})
			.once('error', () => (isLoading = false))
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

		<Grid gap>
			<Grid size="1-2">
				<Button icon="fas fa-angle-left" class="$mt-2" to="/shop">Zurück zum Shop</Button>
			</Grid>
			<Grid size="1-2" class="$text-right">
				<Button
					icon="fas fa-angle-right"
					class="Button--primary $mt-2 $row-reverse"
					to="/shop/checkout/address">Weiter zur Kasse</Button>
			</Grid>
		</Grid>
	{/if}
</Client>
