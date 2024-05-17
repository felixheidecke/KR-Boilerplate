<script lang="ts">
	import './XioniMenuCard.scss'
	import classnames from 'classnames'

	import type { XioniCMS } from '$lib/boilerplate/xioni/cms/xioniCMS.types'

	// --- Props -------------------------------------------------------------------------------------

	export let menuCard: XioniCMS.MenuCard

	// -----------------------------------------------------------------------------------------------

	const baseClassName = $$props['ex-class'] || 'XioniMenuCard'
</script>

<ol class={classnames(baseClassName, $$props.class)}>
	{#each menuCard as group}
		<li class="{baseClassName}__group">
			<div class="{baseClassName}__group-description">
				<h3 class="{baseClassName}__group-name">{group.name}</h3>
				{#if group.description}
					{@html group.description}
				{/if}
			</div>
			<ul class="{baseClassName}__dishes">
				{#each group.items as item}
					<li class="{baseClassName}__dish">
						<h4 class="{baseClassName}__dish-title">{item.name}</h4>
						{#if item.price.value > 0}
							<div class="{baseClassName}__dish-price">
								{item.price.formatted}
							</div>
						{/if}
						{#if item.image}
							<img
								src={item.image.src}
								alt={item.image.alt}
								class="{baseClassName}__dish-image"
								loading="lazy" />
						{/if}
						{#if item.description}
							<div class="{baseClassName}__dish-description">
								{@html item.description}
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ol>
