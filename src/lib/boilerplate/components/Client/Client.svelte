<script>
	import { browser as isBrowser } from '$app/environment'

	export let browser = false
	export let server = false
</script>

{#if (browser && isBrowser) || (server && !isBrowser)}
	<slot />
{/if}
