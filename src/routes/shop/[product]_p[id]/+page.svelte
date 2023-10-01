<script lang="ts">
	import { CART } from '../stores'
	import { Cart } from '../api'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import XioniShopProduct from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	async function addToCart(id: number) {
		const [error, cart] = await Cart.addItem(id)

		if (error) {
			console.error(error)
			return
		}

		CART.set(cart)
	}
</script>

<Client browser>
	{#if data.product}
		<XioniShopProduct product={data.product} on:addToCart={({ detail: id }) => addToCart(id)} />

		<div class="$text-center">
			<Link icon="fas fa-reply" on:click={() => history.back()}>Zurück</Link>
		</div>
	{/if}
</Client>
