<script lang="ts">
	import { blur } from 'svelte/transition'
	import type { PageTransitionProps } from './PageTransition.types'

	// export let path: URL['pathname']
	// export let tag = 'div'

	$: ({ path, tag } = {
		tag: 'div',
		...$$props
	} as PageTransitionProps)
</script>

{#key path}
	<svelte:element this={tag} class="PageTransition" in:blur={{ duration: 250 }}>
		<slot />
	</svelte:element>
{/key}
