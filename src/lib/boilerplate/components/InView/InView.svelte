<script lang="ts">
	import './InView.scss'
	import classnames from 'classnames'
	import { onMount } from 'svelte'

	export let transition: 'fade' | 'scale' | 'fade-ltr' | 'fade-rtl' = 'fade'

	let inView: any
	let wrapper: HTMLElement
	let isInView = false

	onMount(async function () {
		// @ts-ignore
		inView = await import('in-view')
		isInView = inView.is(wrapper)
	})
</script>

<svelte:window on:scroll|passive={() => (isInView = inView.is(wrapper))} />

<div
	bind:this={wrapper}
	class={classnames('InView', $$props.class, !transition || 'InView--' + transition)}
	class:InView--visible={isInView}>
	<slot />
</div>
