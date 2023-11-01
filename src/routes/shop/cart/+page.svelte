<script lang="ts">
	import { Cart } from '../api'
	import { CART } from '../stores'
	import { onDestroy, onMount } from 'svelte'
	import messages from '$lib/messages'

	import type { XioniFetchErrorResponse } from '$lib/boilerplate/libraries/xioni-fetch/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import CartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'

	// -----------------------------------------------------------------------------------------------

	let isLoading: boolean = false

	function updatingHandler() {
		isLoading = true
	}

	function updatedHandler() {
		messages.reset()
		isLoading = false
	}

	function errordHandler(error: XioniFetchErrorResponse) {
		messages.add(error.data.message, undefined, { type: 'error' })
		isLoading = false
	}

	onMount(function () {
		Cart.$event
			.on('updating', updatingHandler)
			.on('updated', updatedHandler)
			.on('error', errordHandler)
	})

	onDestroy(function () {
		Cart.$event
			.off('updating', updatingHandler)
			.off('updated', updatedHandler)
			.off('error', errordHandler)
	})
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
			on:product-quantity-update={({ detail }) =>
				Cart.updateItemQuantity(detail.productId, detail.quantity)} />

		<div class="$mt-2">
			<Button icon="fas fa-angle-left" to="/shop">zurück zum Shop</Button>
			<Button
				icon="fas fa-angle-right"
				class="Button--primary $float-right $row-reverse"
				to="/shop/checkout/address">weiter zur Kasse</Button>
		</div>
	{/if}
</Client>
