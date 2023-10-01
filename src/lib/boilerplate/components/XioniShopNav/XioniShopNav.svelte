<script lang="ts">
	import './XioniShopNav.css'
	import { page } from '$app/stores'
	import classnames from 'classnames'

	import type { XioniShop } from '$lib/boilerplate/xioni/types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let activeGroup: XioniShop.Group | undefined
	export let groups: XioniShop.Group[]
	export let basePath: string = '/'
	export let baseName = 'XioniShopNav'

	// -----------------------------------------------------------------------------------------------

	function makeLink(slug: string, id: number | string) {
		return basePath + `${slug}-c-${id}/`
	}
</script>

<nav class={classnames(baseName, $$props.class)}>
	<ul class="{baseName}__ul $_flex $_flex-wrap $_gap-1/2 $_flex-column@desktop">
		{#each groups as { id, slug, name, subgroups }}
			<li class="{baseName}__li">
				<a
					href={makeLink(slug, id)}
					class={classnames(baseName + '__a', id !== activeGroup?.id || baseName + '__a--active')}>
					{name}
				</a>
				{#if subgroups.length}
					<ul class="{baseName}__ul-ul $ml-1/2 $font-small">
						{#each subgroups as { id, slug, name }}
							<li class="{baseName}__li-li">
								<a
									href={makeLink(slug, id)}
									class={classnames(
										baseName + '__a-a',
										id !== activeGroup?.id || baseName + '__a-a--active'
									)}>
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
