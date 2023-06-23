<script lang="ts">
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import XioniShopProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'

	import { CATEGORY, CATEGORY_PRODUCTS } from '../stores'
</script>

<!-- <pre>{JSON.stringify($CATEGORY_PRODUCTS, null, 2)}</pre> -->

<Client browser>
	<h1>
		{$CATEGORY.name}
	</h1>

	{#if $CATEGORY.description}
		{@html $CATEGORY.description}
	{/if}

	<Grid gap>
		{#each $CATEGORY_PRODUCTS as product}
			<Grid size="1-2">
				<Link class="$decoration-none" to="/shop/{product.slug}_p{product.id}">
					<XioniShopProductTile {product} />
				</Link>
			</Grid>
		{/each}
	</Grid>
</Client>
