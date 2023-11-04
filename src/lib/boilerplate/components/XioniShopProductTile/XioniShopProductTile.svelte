<script lang="ts">
	import './XioniShopProductTile.css'

	import classnames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const { id, name, teaser, price, vat, image } = $$props.product as XioniShop.Product

	// -----------------------------------------------------------------------------------------------

	const className = 'XioniShopProductTile'
</script>

{#if id}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class={classnames(className, $$props.class)} on:click>
		<img
			class="{className}__image"
			src={image?.src || 'https://via.placeholder.com/268x268.png?text=Kein+Produktbild'}
			alt={name || 'Kein Produktbild'}
			title={name || 'Kein Produktbild'}
			loading="lazy" />

		<div class="{className}__data">
			<h4 class="$m-0 $p-0">
				{name}
			</h4>
			{#if teaser}
				<div class="{className}__teaser">
					{@html teaser}
				</div>
			{/if}
			<div class="{className}__price $font-larger">
				{price.formatted}
			</div>
			<div class="{className}__tax">
				inkl. {vat.formatted} MwSt.
			</div>
		</div>
	</div>
{/if}
