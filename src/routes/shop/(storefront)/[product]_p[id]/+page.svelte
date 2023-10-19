<script lang="ts">
	import { CART } from '../../stores'
	import { Cart } from '../../api'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import XioniShopProduct from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'
	import messages from '$lib/messages'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	const { product } = data

	// -----------------------------------------------------------------------------------------------

	async function addToCart(id: number) {
		const [cart, error] = await Cart.addItem(id)

		if (error) {
			messages.add(error.data.message, { type: 'error' })
		} else {
			CART.set(cart)
		}
	}
</script>

{#if product}
	<XioniShopProduct {product} on:addToCart={({ detail: id }) => addToCart(id)} />

	<div class="$text-center">
		<Link icon="fas fa-reply" on:click={() => history.back()}>Zurück</Link>
	</div>
{/if}
