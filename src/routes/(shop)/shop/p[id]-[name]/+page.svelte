<script lang="ts">
	import messages from '$lib/messages'
	import stammdaten from '$stammdaten'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Product from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'
	import { CART } from '../../shop.api'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	const { product } = data

	// -----------------------------------------------------------------------------------------------

	async function addToCartHandler({ detail }: { detail: number }) {
		const [cart, error] = await CART.addItem(detail)

		if (cart) {
			messages.reset()
		} else if (error) {
			messages.add(error.data.message, undefined, { type: 'error' })
		}
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
		<Link icon="fas fa-reply" on:click={() => history.back()}>Zurück</Link>
	</div>
{/if}
