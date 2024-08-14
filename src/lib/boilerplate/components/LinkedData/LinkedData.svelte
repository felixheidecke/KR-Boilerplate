<script lang="ts">
	export let data: Record<string, any>

	const stringifiedData = JSON.stringify({
		'@context': 'https://schema.org',
		...data
	})
</script>

<svelte:element this="script" type="application/ld+json">{stringifiedData}</svelte:element>
