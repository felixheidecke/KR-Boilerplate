<script lang="ts">
	import { shopPath } from './config.js'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import ShopProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'

	export let data
</script>

<Client browser>
	<Grid gap>
		{#each data.products as product}
			<Grid size="1-3">
				<Link class="$decoration-none" to="{shopPath}/{product.slug}_p{product.id}">
					<ShopProductTile {product} />
				</Link>
			</Grid>
		{/each}
	</Grid>
</Client>
