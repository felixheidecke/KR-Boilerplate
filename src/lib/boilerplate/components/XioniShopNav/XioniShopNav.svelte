<script lang="ts">
	import './XioniShopNav.css'

	import { page } from '$app/stores'
	import classnames from 'classnames'

	import type { XioniShop } from '$lib/boilerplate/xioni/shop/xioniShop.types'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let activeGroup: XioniShop.Group | undefined
	export let groups: XioniShop.Group[]
	export let basePath = '/shop'
	export let baseClass = 'XioniShopNav'

	// -----------------------------------------------------------------------------------------------
</script>

<nav class={classnames(baseClass, $$props.class)}>
	<ul class="{baseClass}__ul $_flex $_flex-wrap $_gap-1/2 $_flex-column@desktop">
		{#each groups as { id, slug, name, subgroups }}
			<li class="{baseClass}__li">
				<a
					class="{baseClass}__a"
					href="{basePath}/c{id}-{slug}"
					class:XioniShopNav__a--active={id === activeGroup?.id}>
					{name}
				</a>
				{#if subgroups.length}
					<ul class="{baseClass}__ul-ul $ml-1/2 $font-small">
						{#each subgroups as { id, slug, name }}
							<li class="{baseClass}__li-li">
								<a
									href="{basePath}/c{id}-{slug}"
									class="{baseClass}__a-a"
									class:XioniShopNav__a-a--active={id === activeGroup?.id}>
									{name}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
