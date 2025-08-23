<script lang="ts">
	import { CART } from '$lib/stores'
	import { useCart } from '$lib/boilerplate/xioni/shop/Cart.js'
	import messages from '$lib/messages'

	// --- [ Components ] ----------------------------------------------------------------------------

	import { Link, XioniShopCartButton, XioniShopProduct } from '$lib/boilerplate/components/index.js'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const { data } = $props()
	const { product } = data

	// -----------------------------------------------------------------------------------------------

	async function addToCartHandler({ id }: { id: number }) {
		messages.reset()

		useCart()
			.addItem(id)
			.then(cart => {
				CART.set(cart)
				messages.add(`${product.name} wurde in den Warenkorb gelegt.`, undefined, {
					type: 'success'
				})
			})
			.catch(response => {
				const error = response as Error

				messages.add(error.message, undefined, { type: 'error' })
			})
	}
</script>

<svelte:head>
	<meta name="description" content="Kaufen Sie {product.name} in unserem Online Shop." />
	<title>{product.name} | Online Shop</title>
</svelte:head>

<div class="$py-2">
	<XioniShopCartButton />
</div>

{#if product}
	<XioniShopProduct {product} onAddToCart={addToCartHandler} />
	<hr />
	<div class="$text-center">
		<Link fontello="angle-left" on:click={() => history.back()}>Zurück</Link>
	</div>
{/if}
