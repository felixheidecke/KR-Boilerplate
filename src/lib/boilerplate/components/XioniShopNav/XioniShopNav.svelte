<script lang="ts">
	import './XioniShopNav.scss'
	import type { XioniShopCategories } from '$lib/boilerplate/libraries/xioni-shop/categories.types'

	import classnames from 'classnames'
	import Link from '../Link/Link.svelte'
	import { goto } from '$app/navigation'

	// --- Data --------------------------------------------------------------------------------------

	export let categories: XioniShopCategories = []
	export let basePath = '/shop/'

	const baseName = $$props['ex-class'] || 'XioniShopNav'
	const className = classnames(baseName, $$props.class)

	let categorySelection: string

	function gotoCategory() {
		goto(basePath + categorySelection)
	}
</script>

<nav class={className}>
	<ul class="{baseName}__ul">
		<li class="{baseName}__li">
			Kategorie: <select
				bind:value={categorySelection}
				on:change={gotoCategory}
				class="{baseName}__category-select"
			>
				<option value="home">Vorgestellte Weine</option>
				{#each categories as { name, slug, id }}
					<option value={slug + '_k' + id}>{name}</option>
				{/each}
			</select>
		</li>
		<li class="{baseName}__li">
			<Link icon="fas fa-shopping-cart" class="{baseName}__a" to={`${basePath}/warenkorb`}>
				Warenkorb
			</Link>
		</li>
	</ul>
</nav>
