<script lang="ts">
	// --- [ Components ] ----------------------------------------------------------------------------

	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import { ProductTile } from '$lib/boilerplate/components'
	import Wrapper from '$lib/boilerplate/components/Wrapper/Wrapper.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let { data } = $props()
</script>

<Wrapper size="large" class="$mb-2">
	<Grid gap tag="ol">
		{#each data.products as product, index (product.id)}
			<Grid tag="li" size="tablet-1-3 desktop-1-4" {index}>
				<Link class="$decoration-none" to="/{product.slug}-p-{product.id}/">
					<ProductTile {product} />
				</Link>
			</Grid>
		{/each}
	</Grid>
</Wrapper>
