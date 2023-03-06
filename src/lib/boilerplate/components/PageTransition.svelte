<script>
	import { blur } from 'svelte/transition'
	export let path
	export let tag = 'div'
</script>

{#key path}
	<svelte:element this={tag} class="PageTransition" in:blur={{ duration: 250 }}>
		<slot />
	</svelte:element>
{/key}
