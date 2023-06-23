import MakeShopProducts from '$lib/boilerplate/libraries/xioni-shop/products'
import { get } from 'svelte/store'
import { CATEGORY, PRODUCT_HIGHLIGHTS } from './stores'

export const prerender = false

export const load = async function ({ fetch, parent }) {
	CATEGORY.set({})

	// Do not double fetch
	if (get(PRODUCT_HIGHLIGHTS)?.length) return

	const { module } = await parent()
	const shopProducts = MakeShopProducts(module, fetch)

	PRODUCT_HIGHLIGHTS.set(await shopProducts.getProductHighlights())
}
