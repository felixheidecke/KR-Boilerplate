<script lang="ts">
	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniShopProduct } from '$lib/boilerplate/libraries/xioni-shop/products.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Product from '$lib/boilerplate/components/xioni-shop-product/XioniShopProduct.svelte'
	import Link from '$lib/boilerplate/components/link/Link.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const product = ($$props.data.product as XioniShopProduct) || {}

	// --- [ Logic ] ---------------------------------------------------------------------------------
</script>

<Product {product} />

<Link to="./{product.category?.slug}-c{product.category?.id}" icon="">Zurück</Link>
