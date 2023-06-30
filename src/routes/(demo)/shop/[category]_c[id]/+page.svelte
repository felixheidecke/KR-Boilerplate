<script lang="ts">
	// --- [ Components ] ----------------------------------------------------------------------------

	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import XioniShopProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { ShopCategory } from '$lib/boilerplate/libraries/xioni-shop/categories.types.js'
	import type { ShopProduct } from '$lib/boilerplate/libraries/xioni-shop/products.types.js'

	export let data

	$: category = data.category as ShopCategory
	$: products = data.products as ShopProduct[]
</script>

<Client browser>
	<h1>
		{category.name || 'Kategorie'}
	</h1>

	{#if category.description}
		{@html category.description}
	{/if}

	<Grid gap>
		{#each products as product, index (product.id)}
			<Grid size="1-3">
				<Link class="$decoration-none" to="/shop/{product.slug}_p{product.id}">
					<XioniShopProductTile {product} />
				</Link>
			</Grid>
		{/each}
	</Grid>
</Client>
