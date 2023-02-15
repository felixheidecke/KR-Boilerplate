<script lang="ts">
	import './xioni-menu-card.scss'
	import classnames from 'classnames'
	import formatPrice from '$lib/boilerplate/utils/format-price'
	import type { XioniMenuCard } from '$lib/boilerplate/libraries/xioni/menuCard.types'

	// --- Props -------------------------------------------------------------------------------------

	export let menuCard: XioniMenuCard

	// --- Data --------------------------------------------------------------------------------------

	const baseClassName = $$props['ex-class'] || 'XioniMenuCard'
</script>

<ol class={classnames(baseClassName, $$props.class)}>
	{#each menuCard as category}
		<li class="{baseClassName}__category">
			<div class="{baseClassName}__category-description">
				<h3 class="{baseClassName}__category-name">{category.name}</h3>
				{@html category.description}
			</div>
			<ul class="{baseClassName}__dishes">
				{#each category.items as dish}
					<li class="{baseClassName}__dish">
						<h4 class="{baseClassName}__dish-title">{dish.name}</h4>
						<div class="{baseClassName}__dish-price">
							{formatPrice(dish.price)}
						</div>
						{#if dish.description}
							<div class="{baseClassName}__dish-description">
								{@html dish.description}
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ol>
