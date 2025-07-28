<script lang="ts">
	// --- [ Components ] ----------------------------------------------------------------------------

	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import ProductTile from '$lib/boilerplate/components/ProductTile/ProductTile.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data
</script>

<Client browser>
	<Grid gap tag="ol">
		{#each data.products as product, index (product.id)}
			<Grid tag="li" size="tablet-1-3" {index}>
				<Link class="$decoration-none" to="/{product.slug}-p-{product.id}/">
					<ProductTile {product} />
				</Link>
			</Grid>
		{/each}
	</Grid>
</Client>
