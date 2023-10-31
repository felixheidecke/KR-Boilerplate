<script lang="ts">
	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import XioniShopProductTile from '$lib/boilerplate/components/XioniShopProductTile/XioniShopProductTile.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data
</script>

<h1>{data.category.name || 'Kategorie'}</h1>

{#if data.category.description}
	{@html data.category.description}
{/if}

<ol>
	{#each data.products as product, index}
		<li data-index={index}>
			<Link class="$decoration-none" to="/shop/{product.id}p-{product.slug}">
				<XioniShopProductTile {product} />
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
