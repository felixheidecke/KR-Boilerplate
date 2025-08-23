<script lang="ts">
	import classnames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniShop } from '$lib/boilerplate/xioni/types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let cart: XioniShop.Cart
	export let baseName = 'XioniShopMiniCart'

	// -----------------------------------------------------------------------------------------------
</script>

<section {...$$restProps} class={classnames(baseName, $$props.class)}>
	<div class="{baseName}__title">Warenkorb:</div>
	<ul class="$mt $font-small">
		{#each cart.products as { product, quantity }}
			<li class="$overflow-ellipsis">
				{quantity}&times; {product.name}
			</li>
		{/each}
	</ul>
	<ul class="$mt-1/2 $font-small">
		<li class="$mb-1/4 $flex $space-between">
			<b>Zwischensumme:</b>&nbsp;
			<span>{cart.gross?.formatted}</span>
		</li>
		{#if cart.supplementalCost}
			<li class="$mb-1/4 $flex $space-between">
				<b>{cart.supplementalCost.description}:</b>
				<span>{cart.supplementalCost.formatted}</span>
			</li>
		{/if}
		{#if cart.shipping}
			<li class="$mb-1/4 $flex $space-between">
				<b>Versand:</b>
				<span>{cart.shipping.price.formatted}</span>
			</li>
		{/if}
		{#if cart.total}
			<li class="$flex $space-between">
				<b>Gesamt:</b>
				<span class="$font-bold $decoration-double-underline">{cart.total.formatted}</span>
			</li>
		{/if}
	</ul>
</section>
