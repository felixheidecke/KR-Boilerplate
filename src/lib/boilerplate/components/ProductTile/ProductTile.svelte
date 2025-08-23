<script lang="ts">
	import type { ProductTileProps } from './ProductTile.d'
	import './ProductTile.css'

	import classnames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let {
		class: classProp,
		baseName = 'ProductTile',
		product,
		...restProps
	}: ProductTileProps = $props()

	const { name, teaser, price, vat, image } = product
</script>

{#if product.id}
	<div {...restProps} class={classnames(baseName, classProp)}>
		<img
			class="{baseName}__image"
			src={image?.src || 'https://cdn.klickrhein.de/shop/product-placeholder.png'}
			alt={name || 'Kein Produktbild'}
			title={name || 'Kein Produktbild'}
			loading="lazy" />

		<div class="{baseName}__data">
			<h4 class="$m-0 $p-0">
				{name}
			</h4>
			{#if teaser}
				<p class="{baseName}__teaser">
					{@html teaser}
				</p>
			{/if}
			{#if price}
				<div class="{baseName}__price $font-larger">
					{price.formatted}
				</div>
				<div class="{baseName}__tax">
					inkl. {vat.formatted} MwSt.
				</div>
			{/if}
		</div>
	</div>
{/if}
