<script lang="ts">
	import './XioniShopNav.scss'

	import { goto } from '$app/navigation'
	import classnames from 'classnames'
	import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

	// --- Data --------------------------------------------------------------------------------------

	export let category: XioniShop.Category
	export let categories: XioniShop.Category[]
	export let basePath = '/shop/'

	const baseName = $$props['ex-class'] || 'XioniShopNav'
	const className = classnames(baseName, $$props.class)

	let categorySelection: string

	function gotoCategory() {
		goto(basePath + categorySelection)
	}
</script>

<nav class={className}>
	Kategorie: <select
		bind:value={categorySelection}
		on:change={gotoCategory}
		class="{baseName}__category-select">
		<option value="">Startseite</option>
		{#each categories as { name, slug, id }}
			<option selected={category.id == id} value={slug + '_c' + id}>{name}</option>
		{/each}
	</select>
</nav>
