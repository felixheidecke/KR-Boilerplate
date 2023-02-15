<script lang="ts">
	// import Grid from '$lib/boilerplate/components/grid/Grid.svelte'
	// import XioniShopProductTile from '$lib/boilerplate/components/xioni-shop-product/XioniShopProductTile.svelte'
	import type { XioniShopProducts } from '$lib/boilerplate/libraries/xioni-shop/products.types'
	import { makeProductLink } from '$lib/boilerplate/libraries/xioni-shop/utils'

	const products = $$props.data.products as XioniShopProducts
</script>

<h1>Mein Shop</h1>

<Grid tag="ul" gap rowGap>
	{#each products as product}
		<Grid size="1-3" tag="li">
			<XioniShopProductTile {product} link={makeProductLink(product)} />
		</Grid>
	{/each}
</Grid>
