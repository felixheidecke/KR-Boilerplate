<script lang="ts">
	import './AccordionSlide.scss'
	import classnames from 'classnames'
	import { getContext } from 'svelte'
	import { slide } from 'svelte/transition'
	import type { Writable } from 'svelte/store'

	export let title: string

	const id = Math.random()
	const activeItem = getContext('Accordion:active-item') as Writable<null | number>

	$: collapsed = id !== $activeItem

	const handleClick = () => {
		activeItem.set($activeItem === id ? null : id)
	}

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'AccordionSlide'
	$: className = classnames(baseName, $$props.class)
</script>

<li class={className} on:click={handleClick}>
	<h5 class="{baseName}__title">
		{title}
	</h5>
	{#if !collapsed}
		<div in:slide out:slide class="{baseName}__content">
			<slot />
		</div>
	{/if}
</li>
