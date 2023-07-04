<script lang="ts">
	import { module } from '../config'
	import { CART } from '../_stores'

	import type { ShopProduct } from '$lib/boilerplate/libraries/xioni-shop/products.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import XioniShopProduct from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'
	import MakeShopCart from '$lib/boilerplate/libraries/xioni-shop/cart'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data
	const product: ShopProduct | undefined = data.product

	let cartErrors: any

	async function addToCart(id: number) {
		const { addItem } = MakeShopCart(module)
		const { success, data } = await addItem(id)

		if (success) {
			CART.set(data)
		} else {
			cartErrors = data.payload
		}
	}
</script>

<Client browser>
	{#if product}
		<XioniShopProduct {product} on:addToCart={({ detail: id }) => addToCart(id)} />

		<div class="$text-center">
			<Link icon="fas fa-reply" on:click={() => history.back()}>Zurück</Link>
		</div>
	{/if}
</Client>
