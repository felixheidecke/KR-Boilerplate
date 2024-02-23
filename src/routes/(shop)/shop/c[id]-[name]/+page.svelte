<script lang="ts">
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import stammdaten from '$stammdaten'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import ProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'

	// -----------------------------------------------------------------------------------------------

	export let data

	$: ({ category, products } = data)
</script>

<svelte:head>
	<meta name="description" content="Kaufen Sie {category.name} in unserem Online Shop." />
	<title>{category.name} | {stammdaten.name} Online Shop</title>
</svelte:head>

<h1 class="h3">
	{#each category.path || [] as { $id, name }}
		<Link to="/shop/c{$id}-{name}">
			{name}
		</Link>
		/
	{/each}
	{category.name}
</h1>

{#if category.description}
	{@html category.description}
{/if}

<Grid gap tag="ol">
	{#each products || [] as product, index (product.$id)}
		<Grid tag="li" size="tablet-1-2" {index}>
			<Link class="$decoration-none" to="/shop/p{product.$id}-{product.slug}">
				<ProductTile {product} />
			</Link>
		</Grid>
	{/each}
</Grid>
{#if category.subcategories}
	<hr />
	<Grid gap tag="ol">
		{#each category.subcategories as subcategory, index (subcategory.$id)}
			<Grid tag="li" size="1" {index}>
				<h3 class="h4">
					<Link to="/shop/c{subcategory.$id}-{subcategory.slug}">
						{subcategory.name}
					</Link>
				</h3>
				{#if subcategory.description}
					{@html subcategory.description}
				{/if}
				<ol class="subcategory-product-list">
					{#each subcategory.products || [] as product, index (product.$id)}
						<li>
							<Link to="/shop/p{product.$id}-{product.slug}" {index}>
								{product.name}
							</Link>
						</li>
					{/each}
				</ol>
			</Grid>
		{/each}
	</Grid>
{/if}

<style lang="scss">
	@import '$variables';

	.subcategory-product-list {
		@include breakpoint('tablet-up') {
			column-count: 2;
		}
	}
</style>
