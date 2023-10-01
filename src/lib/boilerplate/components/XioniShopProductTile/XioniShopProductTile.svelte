<script lang="ts">
	import './XioniShopProductTile.css'

	import classnames from 'classnames'

	import type { XioniShop } from '$lib/boilerplate/xioni/types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let product: XioniShop.Product
	export let className = 'XioniShopProductTile'

	const { name, teaser, price, vat, image } = product
</script>

{#if product.id}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click {...$$restProps} class={classnames(className, $$props.class)}>
		<img
			class="{className}__image"
			src={image?.src || 'https://cdn.klickrhein.de/boilerplate/shop/product-placeholder.png'}
			alt={name || 'Kein Produktbild'}
			title={name || 'Kein Produktbild'}
			loading="lazy" />

		<div class="{className}__data">
			<h4 class="$m-0 $p-0">
				{name}
			</h4>
			{#if teaser}
				<p class="{className}__teaser">
					{@html teaser}
				</p>
			{/if}
			{#if price}
				<div class="{className}__price $font-larger">
					{price.formatted}
				</div>
				<div class="{className}__tax">
					inkl. {vat.formatted} MwSt.
				</div>
			{/if}
		</div>
	</div>
{/if}
