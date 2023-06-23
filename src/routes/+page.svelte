<script>
	const { stammdaten } = $$props.data
</script>

<svelte:head>
	<title>Willkommen | {stammdaten.title} | {stammdaten.name}</title>
</svelte:head>

<div class="$text-center">
	<img src="https://media.giphy.com/media/l378ryVoDmMwKoSt2/giphy.gif" alt="Hund auf Skateboard" />
</div>

<style lang="scss">
	@import '$variables';
</style>
