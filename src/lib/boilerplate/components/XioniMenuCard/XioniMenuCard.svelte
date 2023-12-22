<script lang="ts">
	import './XioniMenuCard.scss'
	import classnames from 'classnames'
	import formatPrice from '$lib/boilerplate/utils/format-price'
	import type { XioniMenuCard } from '$lib/boilerplate/libraries/xioni/menuCards.types'

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
				{#if category.description}
					{@html category.description}
				{/if}
			</div>
			<ul class="{baseClassName}__dishes">
				{#each category.items as dish}
					<li class="{baseClassName}__dish">
						<h4 class="{baseClassName}__dish-title">{dish.name}</h4>
						<div class="{baseClassName}__dish-price">
							{dish.price.formatted}
						</div>
						{#if dish.image}
							<img
								src={dish.image.src}
								alt={dish.image.alt}
								class="{baseClassName}__dish-image"
								loading="lazy" />
						{/if}
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
