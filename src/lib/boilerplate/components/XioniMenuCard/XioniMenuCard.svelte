<script lang="ts">
	import './XioniMenuCard.scss'
	import classnames from 'classnames'

	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- Props -------------------------------------------------------------------------------------

	export let menuCard: XioniCMS.MenuCard
	export let baseName = 'XioniMenuCard'
</script>

<ol class={classnames(baseName, $$props.class)}>
	{#each menuCard as group}
		<li class="{baseName}__group">
			<h3 class="{baseName}__group-name">{group.name}</h3>
			{#if group.description}
				<p class="{baseName}__group-description">{@html group.description}</p>
			{/if}
			<ul class="{baseName}__dishes">
				{#each group.items as item}
					<li class="{baseName}__dish">
						<h4 class="{baseName}__dish-title">{item.name}</h4>
						{#if item.price.value > 0}
							<div class="{baseName}__dish-price">
								{item.price.formatted}
							</div>
						{/if}
						{#if item.image}
							<img
								src={item.image.src}
								alt={item.image.alt}
								class="{baseName}__dish-image"
								loading="lazy" />
						{/if}
						{#if item.description}
							<p class="{baseName}__dish-description">
								{@html item.description}
							</p>
						{/if}
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ol>
