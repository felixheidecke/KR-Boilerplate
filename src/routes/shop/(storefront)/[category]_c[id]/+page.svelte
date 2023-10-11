<script lang="ts">
	// --- [ Components ] ----------------------------------------------------------------------------

	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import XioniShopProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data
</script>

<Client browser>
	<h1>
		{data.category.name || 'Kategorie'}
	</h1>

	{#if data.category.description}
		{@html data.category.description}
	{/if}

	<Grid gap>
		{#each data.products as product, index (product.id)}
			<Grid size="1-3" data-index={index}>
				<Link class="$decoration-none" to="/shop/{product.slug}_p{product.id}">
					<XioniShopProductTile {product} />
				</Link>
			</Grid>
		{/each}
	</Grid>
</Client>
