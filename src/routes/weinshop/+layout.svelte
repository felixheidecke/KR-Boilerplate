<script>
	import '$lib/boilerplate/styles/style.scss'
	import '$lib/styles/style.scss'

	import { CART } from './stores'
	export let data
</script>

<Grid gap class="shop-layout-wrapper $p-2">
	<Grid size="1-5" tag="aside">
		<XioniShopNav cart={$CART} categories={data.categories} />
	</Grid>
	<Grid size="4-5" tag="section">
		<slot />
	</Grid>
</Grid>

<style>
	:global(.shop-layout-wrapper) {
		max-width: 960px;
		margin: 0 auto;
	}
</style>
