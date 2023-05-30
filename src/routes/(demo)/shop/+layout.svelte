<script>
	import ShopCategories from '$lib/boilerplate/libraries/xioni-shop/categories'

	const { getCategories } = ShopCategories($$props.data.shopModule)
</script>

<Client browser>
	{#await getCategories() then categories}
		{#if categories}
			<pre>{JSON.stringify(categories, null, 2)}</pre>
		{/if}
	{/await}
</Client>

<slot />
