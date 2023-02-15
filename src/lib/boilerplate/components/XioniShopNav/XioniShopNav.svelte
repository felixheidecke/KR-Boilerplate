<script lang="ts">
	import './XioniShopNav.scss'
	import type { XioniShopCart } from '$lib/boilerplate/libraries/xioni-shop/cart.types'
	import type { XioniShopCategories } from '$lib/boilerplate/libraries/xioni-shop/categories.types'

	import classnames from 'classnames'
	import Link from '../Link/Link.svelte'

	// --- Data --------------------------------------------------------------------------------------

	export let cart: XioniShopCart
	export let categories: XioniShopCategories = []
	export let basePath = '/shop/'

	const baseName = $$props['ex-class'] || 'Shop3Nav'
	const className = classnames(baseName, $$props.class)
</script>

<nav class={className}>
	<ul class="{baseName}__ul">
		<li class="{baseName}__li">
			<Link icon="fas fa-home" class="{baseName}__a" to={basePath}>Shop Startseite</Link>
		</li>
		<li class="$mt $font-bold">Kategorien</li>
		{#each categories as { id, slug, name, productCount }}
			<li class="{baseName}__li">
				<a class="{baseName}__a" href={`${basePath}${slug}-c${id}`}>
					{name}
					<small>({productCount})</small>
				</a>
			</li>
		{/each}
		<li class="{baseName}__li $mt-2">
			<Link icon="fas fa-balance-scale" class="{baseName}__a" to={`${basePath}/agb`}>
				Geschäftsbedingungen
			</Link>
		</li>
		<li class="{baseName}__li">
			<Link icon="fas fa-shopping-cart" class="{baseName}__a" to={`${basePath}/warenkorb`}>
				Warenkorb
			</Link>
			{#if cart}
				<small>
					({cart.products.length})
				</small>
			{/if}
		</li>
	</ul>
</nav>
