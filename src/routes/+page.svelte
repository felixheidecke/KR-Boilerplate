<script lang="ts">
	// --- [ Components ] ----------------------------------------------------------------------------

	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import { ProductTile } from '$lib/boilerplate/components'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let { data } = $props()
</script>

<Grid gap tag="ol">
	{#each data.products as product, index (product.id)}
		<Grid tag="li" size="tablet-1-3" {index}>
			<Link class="$decoration-none" to="/{product.slug}-p-{product.id}/">
				<ProductTile {product} />
			</Link>
		</Grid>
	{/each}
</Grid>
