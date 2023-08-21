<script lang="ts">
	import { blur } from 'svelte/transition'
	import { page } from '$app/stores'

	export let tag = 'div'
</script>

{#key $page.url.pathname}
	<svelte:element this={tag} class="PageTransition" in:blur={{ duration: 250 }}>
		<slot />
	</svelte:element>
{/key}
