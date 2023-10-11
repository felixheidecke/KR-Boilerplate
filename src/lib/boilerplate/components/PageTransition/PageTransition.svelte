<script lang="ts">
	import { blur } from 'svelte/transition'
	import { page } from '$app/stores'
	import classnames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let tag = 'div'
	export let baseName = 'PageTransition'
</script>

{#key $page.url.pathname}
	<svelte:element
		this={tag}
		{...$$restProps}
		class={classnames(baseName, $$props.class)}
		in:blur={{ duration: 250 }}>
		<slot />
	</svelte:element>
{/key}
