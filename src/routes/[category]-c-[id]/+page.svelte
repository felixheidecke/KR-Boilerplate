<script lang="ts">
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'

	// --- [ Components ] ----------------------------------------------------------------------------

	import { Link, ProductTile } from '$lib/boilerplate/components'
	import Wrapper from '$lib/boilerplate/components/Wrapper/Wrapper.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let { data } = $props()

	const group = $derived(data.group)
	const products = $derived((data.products || []).filter(product => product.group === group.id))
</script>

<svelte:head>
	<meta name="description" content="Kaufen Sie {group.name} in unserem Online Shop." />
	<title>{group.name} | Online Shop</title>
</svelte:head>
<Wrapper size="large" class="$mb-2">
	<h1 class="h3">
		{#each group.path || [] as { id, name, slug }}
			<Link to="/{slug}-c-{id}/">
				{name}
			</Link>
			/
		{/each}
		{group.name}
	</h1>

	{#if group.description}
		<p>{@html group.description}</p>
	{/if}

	{#if products.length}
		<Grid gap tag="ol">
			{#each products as product, index (product.id)}
				<Grid tag="li" size="tablet-1-3" {index}>
					<Link class="$decoration-none" to="/{product.slug}-p-{product.id}/">
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
						<Link to="/{subgroup.slug}-c-{subgroup.id}">
							{subgroup.name}
						</Link>
					</h3>
					{#if subgroup.description}
						{@html subgroup.description}
					{/if}
					<ol class="subgroup-product-list">
						{#each products.filter(product => product.group === subgroup.id) || [] as product, index (product.id)}
							<li>
								<Link to="/{product.slug}-p-{product.id}/" {index}>
									{product.name}
								</Link>
							</li>
						{/each}
					</ol>
				</Grid>
			{/each}
		</Grid>
	{/if}
</Wrapper>

<style lang="scss">
	@use '$lib/boilerplate/styles/mixins' as mixins;

	.subgroup-product-list {
		@include mixins.breakpoint('tablet-up') {
			column-count: 2;
		}
	}
</style>
