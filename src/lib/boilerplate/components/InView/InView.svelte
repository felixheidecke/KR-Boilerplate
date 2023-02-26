<script lang="ts">
	import './InView.scss'
	import classnames from 'classnames'
	import { onMount } from 'svelte'
	import type { InViewTransition } from './InView.types'

	export let transition: InViewTransition = 'fade'

	let inView: any
	let wrapper: HTMLElement
	let isInView = false

	onMount(async function () {
		inView = await import('in-view')
		isInView = inView.is(wrapper)
	})

	// --- CSS Classname ----------------

	const baseName = $$props['ex-class'] || 'InView'

	$: className = classnames(
		baseName,
		$$props.class,
		!isInView || baseName + '--visible',
		!transition || baseName + '--fade'
	)
</script>

<svelte:window on:scroll|passive={() => (isInView = inView.is(wrapper))} />

<div bind:this={wrapper} class={className}>
	<slot />
</div>
