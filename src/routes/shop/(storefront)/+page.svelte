<script lang="ts">
	import { shopPath } from '../config.js'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import ProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	$: ({ products } = data)
</script>

<Grid gap tag="ol">
	{#each products as product, index (product.id)}
		<Grid tag="li" size="tablet-1-2" {index}>
			<Link class="$decoration-none" to="{shopPath}/p{product.id}-{product.slug}">
				<ProductTile {product} />
			</Link>
		</Grid>
	{/each}
</Grid>
