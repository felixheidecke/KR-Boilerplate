<script lang="ts">
	import './InView.scss'
	import classnames from 'classnames'
	import { onMount } from 'svelte'
	import type { InViewTransition } from './InView.types'

	export let transition: string | InViewTransition = 'fade'

	let inView: any
	let wrapper: HTMLElement
	let isInView = false

	onMount(async function () {
		inView = await import('in-view')
		isInView = inView.is(wrapper)
	})

	// --- CSS Classname ----------------

	$: className = classnames('InView', $$props.class, !transition || 'InView--' + transition)
</script>

<svelte:window on:scroll|passive={() => (isInView = inView.is(wrapper))} />

<div bind:this={wrapper} class={className} class:InView--visible={isInView}>
	<slot />
</div>
