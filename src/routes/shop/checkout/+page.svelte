<script lang="ts">
	import { CART } from '../shop.stores'
	import { cartApi } from '../shop.api'
	import { onMount } from 'svelte'
	import messages from '$lib/messages'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniFetchErrorResponse } from '$lib/boilerplate/xioni/utils/xioniFetch'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import CartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'

	// -----------------------------------------------------------------------------------------------

	let isLoading: boolean = false

	function updateItemQuantity({ detail }: any) {
		isLoading = true

		cartApi
			.updateItemQuantity(detail.productId, detail.quantity)
			.then(cart => {
				CART.set(cart)
				messages.reset()
			})
			.catch(response => {
				const { data: error } = response as XioniFetchErrorResponse

				messages.add(error.message, 'Achtung!', { type: 'error' })
			})
			.finally(() => (isLoading = false))
	}

	onMount(messages.reset)
</script>

<h1>Warenkorb</h1>
<Client browser>
	{#if !$CART.products?.length}
		<h4>Ihr Warenkorb ist noch leer.</h4>
		<Link to="/shop/" icon="fas fa-store">Zum Shop</Link>
	{:else}
		<CartTable
			products={$CART.products}
			supplementalCost={$CART.supplementalCost}
			shipping={$CART.shipping}
			total={$CART.total}
			quantitySelector
			readOnly={isLoading}
			on:product-quantity-update={updateItemQuantity} />

		<div class="$mt-2">
			<Button icon="fas fa-angle-left" to="/shop/">zum Shop</Button>
			<Button
				icon="fas fa-angle-right"
				class="Button--primary $float-right $row-reverse"
				to="/shop/checkout/address/">zur Kasse</Button>
		</div>
	{/if}
</Client>
