<script lang="ts">
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import stammdaten from '$stammdaten'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import ProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	// -----------------------------------------------------------------------------------------------

	$: group = data.group
	$: products = data.products || []
	$: mainProducts = products.filter(product => product.group === group.id)
</script>

<svelte:head>
	<meta name="description" content="Kaufen Sie {group.name} in unserem Online Shop." />
	<title>{group.name} | {stammdaten.name} Online Shop</title>
</svelte:head>

<h1 class="h3">
	{#each group.path || [] as { id, name, slug }}
		<Link to="/shop/{slug}-c-{id}/">
			{name}
		</Link>
		/
	{/each}
	{group.name}
</h1>

{#if group.description}
	<p>{@html group.description}</p>
{/if}

{#if mainProducts.length}
	<Grid gap tag="ol">
		{#each mainProducts as product, index (product.id)}
			<Grid tag="li" size="tablet-1-2" {index}>
				<Link class="$decoration-none" to="/shop/{product.slug}-p-{product.id}/">
					<ProductTile {product} />
				</Link>
			</Grid>
		{/each}
	</Grid>
{/if}
{#if group.subgroups}
	<hr />
	<Grid gap tag="ol">
		{#each group.subgroups as subgroup, index (subgroup.id)}
			<Grid tag="li" size="1" {index}>
				<h3 class="h4">
					<Link to="/shop/{subgroup.slug}-c-{subgroup.id}">
						{subgroup.name}
					</Link>
				</h3>
				{#if subgroup.description}
					{@html subgroup.description}
				{/if}
				<ol class="subgroup-product-list">
					{#each products.filter(product => product.group === subgroup.id) || [] as product, index (product.id)}
						<li>
							<Link to="/shop/{product.slug}-p-{product.id}/" {index}>
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
	@use '$lib/boilerplate/styles/mixins' as mixins;

	.subgroup-product-list {
		@include mixins.breakpoint('tablet-up') {
			column-count: 2;
		}
	}
</style>
