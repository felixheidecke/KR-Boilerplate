<script lang="ts">
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import stammdaten from '$stammdaten'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import XioniShopProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	const { category, products } = data
</script>

<svelte:head>
	<meta name="description" content="Kaufen Sie {category.name} in unserem Online Shop." />
	<title>{category.name} | {stammdaten.name} Online Shop</title>
</svelte:head>

<h1>{category.name || 'Kategorie'}</h1>

{#if category.description}
	{@html category.description}
{/if}

<Grid gap tag="ol">
	{#each products as product}
		<Grid tag="li" size="tablet-1-2">
			<Link class="$decoration-none" to="/shop/p{product.id}-{product.slug}">
				<XioniShopProductTile {product} />
			</Link>
		</Grid>
	{/each}
</Grid>
