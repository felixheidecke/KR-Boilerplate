<script lang="ts">
	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import ProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data
</script>

<Client browser>
	<Grid gap tag="ol">
		{#each data.products as product, index (product.id)}
			<Grid tag="li" size="tablet-1-2" {index}>
				<Link class="$decoration-none" to="/shop/{product.slug}-p-{product.id}/">
					<ProductTile {product} />
				</Link>
			</Grid>
		{/each}
	</Grid>
</Client>
