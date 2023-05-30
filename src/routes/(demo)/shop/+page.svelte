<script>
	import ShopProducts from '$lib/boilerplate/libraries/xioni-shop/products'

	const { getProductHighlights } = ShopProducts($$props.data.shopModule)
</script>

<Client browser>
	{#await getProductHighlights() then products}
		{#if products}
			<Grid gap>
				{#each products as product}
					<Grid size="1-3">
						<Link class="$decoration-none" to="/shop/{product.id}p_{product.slug}">
							<XioniShopProductTile {product} />
						</Link>
					</Grid>
				{/each}
			</Grid>
		{/if}
	{/await}
</Client>
