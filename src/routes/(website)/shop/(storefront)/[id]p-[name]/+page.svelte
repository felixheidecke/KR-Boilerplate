<script lang="ts">
	import { Cart } from '../../api'
	import { onDestroy, onMount } from 'svelte'
	import messages from '$lib/messages'

	import type { XioniFetchErrorResponse } from '$lib/boilerplate/libraries/xioni-fetch/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Product from '$lib/boilerplate/components/XioniShopProduct/XioniShopProduct.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	const { product } = data

	// -----------------------------------------------------------------------------------------------

	function updatedHandler() {
		messages.reset()
	}

	function errordHandler(error: XioniFetchErrorResponse) {
		messages.add(error.data.message, { type: 'error' })
	}

	onMount(function () {
		Cart.$event.on('updated', updatedHandler).on('error', errordHandler)
	})

	onDestroy(function () {
		Cart.$event.off('updated', updatedHandler).off('error', errordHandler)
	})
</script>

{#if product}
	<Product {product} on:addToCart={({ detail: id }) => Cart.addItem(id)} />

	<div class="$text-center">
		<Link icon="fas fa-reply" on:click={() => history.back()}>Zurück</Link>
	</div>
{/if}
