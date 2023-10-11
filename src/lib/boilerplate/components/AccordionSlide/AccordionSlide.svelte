<script lang="ts">
	import './AccordionSlide.scss'

	import { getContext } from 'svelte'
	import { slide } from 'svelte/transition'
	import classnames from 'classnames'
	import type { Writable } from 'svelte/store'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let title: string
	export let baseName = 'AccordionSlide'

	// -----------------------------------------------------------------------------------------------

	const id = Math.random()
	const activeItem = getContext('Accordion:active-item') as Writable<null | number>

	$: collapsed = id !== $activeItem
	$: className = classnames(
		baseName,
		$$props.class,
		!!collapsed || `${baseName}--expanded`,
		!collapsed || `${baseName}--collapsed`
	)

	function handleClick() {
		activeItem.set($activeItem === id ? null : id)
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li on:click={handleClick} on:keypress {...$$restProps} class={className}>
	<h5 class="{baseName}__title">
		{title}
	</h5>
	{#if !collapsed}
		<div in:slide out:slide class="{baseName}__content">
			<slot />
		</div>
	{/if}
</li>
