<script lang="ts">
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import XioniShopProduct from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'

	import { CART, PRODUCT } from '../stores'
	import MakeShopCart from '$lib/boilerplate/libraries/xioni-shop/cart'

	const { updateQuantity } = MakeShopCart($$props.data.module)

	async function addToCartHandler(id: number) {
		const updatedCart = await updateQuantity(id, 1)

		if (updatedCart) {
			CART.set(updatedCart)
		}
	}
</script>

<Client browser>
	{#if $PRODUCT}
		<XioniShopProduct product={$PRODUCT} on:addToCart={() => addToCartHandler($PRODUCT.id)} />

		<div class="$text-center">
			<Link icon="fas fa-reply" on:click={() => history.back()}>Zurück</Link>
		</div>
	{/if}
</Client>
