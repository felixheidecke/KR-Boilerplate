<script>
	import { browser as isBrowser } from '$app/environment'

	export let browser = false
	export let server = false
</script>

{#if $$slots.browser && isBrowser}
	<slot name="browser" />
{:else if $$slots.server && !isBrowser}
	<slot name="server" />
{:else if (browser && isBrowser) || (server && !isBrowser)}
	<slot />
{/if}
