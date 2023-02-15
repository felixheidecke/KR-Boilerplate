<script lang="ts">
	import { makeProductLink } from '$lib/boilerplate/libraries/xioni-shop/utils'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniShopCategory } from '$lib/boilerplate/libraries/xioni-shop/categories.types'
	import type { XioniShopProducts } from '$lib/boilerplate/libraries/xioni-shop/products.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	// import ProductTile from '$lib/boilerplate/components/xioni-shop-product/XioniShopProductTile.svelte'
	// import Grid from '$lib/boilerplate/components/grid/Grid.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const products = $$props.data.products as XioniShopProducts
	const category = $$props.data.category as XioniShopCategory

	console.log(category)
</script>

<h1>Kategorie {category.name}</h1>

<Grid tag="ul" gap rowGap>
	{#each products as product}
		<Grid size="1-3" tag="li">
			<ProductTile {product} link={makeProductLink(product)} />
		</Grid>
	{/each}
</Grid>
