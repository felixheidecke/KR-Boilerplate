<script lang="ts">
	import messages from '$lib/messages'
	import stammdaten from '$stammdaten'
	import { cartApi } from '../../shop.api'
	import { CART } from '../../shop.stores'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniFetchErrorResponse } from '$lib/boilerplate/xioni/utils/xioniFetch'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Product from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	// -----------------------------------------------------------------------------------------------

	const { product } = data

	async function addToCartHandler({ detail }: { detail: number }) {
		messages.reset()

		cartApi
			.addItem(detail)
			.then(cart => {
				CART.set(cart)
				messages.add(`${product.name} wurde in den Warenkorb gelegt.`, undefined, {
					type: 'success'
				})
			})
			.catch(response => {
				const { data: error } = response as XioniFetchErrorResponse

				messages.add(error.message, undefined, { type: 'error' })
			})
	}
</script>

<svelte:head>
	<meta name="description" content="Kaufen Sie {product.name} in unserem Online Shop." />
	<title>{product.name} | {stammdaten.name} Online Shop</title>
</svelte:head>

{#if product}
	<Product {product} on:addToCart={addToCartHandler} />

	<hr />

	<div class="$text-center">
		<Link fontello="angle-left" on:click={() => history.back()}>Zurück</Link>
	</div>
{/if}
