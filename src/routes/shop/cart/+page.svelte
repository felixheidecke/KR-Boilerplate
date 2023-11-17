<script lang="ts">
	import { Cart } from '../api'
	import { CART } from '../stores'
	import { beforeNavigate } from '$app/navigation'
	import { isBoolean } from 'lodash-es'
	import messages from '$lib/messages'

	import type { XioniFetchErrorResponse } from '$lib/boilerplate/xioni/utils/xioniFetch'
	import type { XioniShop } from '$lib/boilerplate/xioni/shop-api/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import CartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'

	// -----------------------------------------------------------------------------------------------

	let isLoading: boolean = false

	function toggleLoading(status?: boolean) {
		isLoading = isBoolean(status) ? status : !isLoading
	}

	function errorHandler(error: XioniFetchErrorResponse) {
		messages.add(error.data.message, undefined, { type: 'error' })
	}

	function successHandler(cart: XioniShop.Cart) {
		CART.set(cart)
		messages.reset()
	}

	function updateItemQuantity({ detail }: any) {
		Cart.updateItemQuantity(detail.productId, detail.quantity)
	}

	Cart.$event
		.on('loading-toggle', toggleLoading)
		.on('error', errorHandler)
		.on('success', successHandler)

	beforeNavigate(function () {
		Cart.$event.removeAllListeners()
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
			on:product-quantity-update={updateItemQuantity} />

		<div class="$mt-2">
			<Button icon="fas fa-angle-left" to="/shop">zurück zum Shop</Button>
			<Button
				icon="fas fa-angle-right"
				class="Button--primary $float-right $row-reverse"
				to="/shop/checkout/address">weiter zur Kasse</Button>
		</div>
	{/if}
</Client>
