<script lang="ts">
	import { shopPath } from '../config.js'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import ShopProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data
</script>

<ol>
	{#each data.products as product, index}
		<li data-index={index}>
			<Link class="$decoration-none" to="{shopPath}/{product.slug}_p{product.id}">
				<ShopProductTile {product} />
			</Link>
		</li>
	{/each}
</ol>

<style>
	ol {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
		gap: 1rem;
	}
</style>
