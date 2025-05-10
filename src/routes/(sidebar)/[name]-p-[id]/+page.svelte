<script lang="ts">
	import { CART } from '$lib/stores'
	import { useCart } from '$lib/boilerplate/xioni/shop/Cart.js'
	import messages from '$lib/messages'
	import type { AxiosError } from 'axios'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Product from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data
	const { product } = data

	// -----------------------------------------------------------------------------------------------

	async function addToCartHandler(productId: number) {
		messages.reset()

		useCart()
			.addItem(productId)
			.then(cart => {
				CART.set(cart)
				messages.add(`${product.name} wurde in den Warenkorb gelegt.`, undefined, {
					type: 'success'
				})
			})
			.catch(response => {
				const error = response as AxiosError

				messages.add(error.message, undefined, { type: 'error' })
			})
	}
</script>

<svelte:head>
	<meta name="description" content="Kaufen Sie {product.name} in unserem Online Shop." />
	<title>{product.name} | Online Shop</title>
</svelte:head>

{#if product}
	<Product {product} on:addToCart={() => addToCartHandler(product.id)} />

	<hr />

	<div class="$text-center">
		<Link fontello="angle-left" on:click={() => history.back()}>Zurück</Link>
	</div>
{/if}
