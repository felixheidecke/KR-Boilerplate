<script lang="ts">
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import ShopProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'

	import { PRODUCT_HIGHLIGHTS } from './stores'
</script>

<Client browser>
	{#if $PRODUCT_HIGHLIGHTS}
		<Grid gap>
			{#each $PRODUCT_HIGHLIGHTS as product}
				<Grid size="1-2">
					<Link class="$decoration-none" to="/shop/{product.slug}_p{product.id}">
						<ShopProductTile {product} />
					</Link>
				</Grid>
			{/each}
		</Grid>
	{/if}
</Client>
