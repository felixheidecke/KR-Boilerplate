<script lang="ts">
	// --- [ Components ] ----------------------------------------------------------------------------

	import {
		Grid,
		Link,
		ProductTile,
		XioniShopCartButton
	} from '$lib/boilerplate/components/index.js'

	// --- [ Setup ] ---------------------------------------------------------------------------------

	let { data } = $props()
</script>

<div class="$py-2">
	<XioniShopCartButton />
</div>
<Grid gap tag="ol">
	{#each data.products as product, index (product.id)}
		<Grid tag="li" size="tablet-1-3 desktop-1-4" {index}>
			<Link class="$decoration-none" to="/{product.slug}-p-{product.id}/">
				<ProductTile {product} />
			</Link>
		</Grid>
	{/each}
</Grid>
