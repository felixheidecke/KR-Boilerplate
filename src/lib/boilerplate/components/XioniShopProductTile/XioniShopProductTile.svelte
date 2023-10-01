<script lang="ts">
	import './XioniShopProductTile.css'

	import classnames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const { id, name, category, price, vat, image } = $$props.product as XioniShop.Product

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'XioniShopProductTile'
	const className = classnames(baseName, $$props.class)
</script>

{#if id}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div data-component class={className} on:click>
		<img
			class="{baseName}__image"
			src={image?.src || 'https://via.placeholder.com/268x268.png?text=Kein+Produktbild'}
			alt={name || 'Kein Produktbild'}
			title={name || 'Kein Produktbild'}
			loading="lazy" />

		<div class="{baseName}__data">
			<h4 class="$m-0 $p-0">
				{name}
			</h4>
			{#if category}
				<h5 class="$m-0 $p-0">
					<span class="{baseName}__category">{category.name}</span>
				</h5>
			{/if}
			<div class="{baseName}__price">
				{price.formatted}
			</div>
			<div class="{baseName}__tax">
				inkl. {vat.formatted} MwSt.
			</div>
		</div>
	</div>
{/if}
