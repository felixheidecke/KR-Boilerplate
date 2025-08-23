<script lang="ts">
	import { CART } from '$lib/stores'
	import { onMount } from 'svelte'
	import { useCart } from '$lib/boilerplate/xioni/shop/Cart'
	import messages from '$lib/messages'

	// --- [ Components ] ----------------------------------------------------------------------------

	import { Button, XioniShopCartTable } from '$lib/boilerplate/components'

	// -----------------------------------------------------------------------------------------------

	let isLoading: boolean = false

	function updateItemQuantity({ detail }: any) {
		isLoading = true

		useCart()
			.updateItemQuantity(detail.productId, detail.quantity)
			.then(cart => {
				CART.set(cart)
				messages.reset()
			})
			.catch(response => {
				const { data: error } = response as any

				messages.add(error.message, 'Achtung!', { type: 'error' })
			})
			.finally(() => (isLoading = false))
	}

	onMount(messages.reset)
</script>

<h2>Warenkorb</h2>
{#if !$CART.products?.length}
	<h4>Ihr Warenkorb ist noch leer.</h4>
	<Button fontello="angle-left" to="/">zum Shop</Button>
{:else}
	<XioniShopCartTable
		products={$CART.products}
		supplementalCost={$CART.supplementalCost}
		shipping={$CART.shipping}
		total={$CART.total}
		quantitySelector
		readOnly={isLoading}
		on:product-quantity-update={updateItemQuantity} />

	<div class="$mt-2">
		<Button fontello="angle-left" to="/">zum Shop</Button>
		<Button
			fontello="angle-right"
			class="Button--primary $float-right $row-reverse"
			to="/checkout/address/">zur Kasse</Button>
	</div>
{/if}
