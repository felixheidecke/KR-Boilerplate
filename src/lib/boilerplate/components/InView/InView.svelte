<script>
	import './in-view.scss'
	import classnames from 'classnames'
	import { onMount } from 'svelte'

	export let transition = 'fade'

	let inView
	let wrapper
	let isInView = false

	onMount(async () => {
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
