<script>
	const { title, name } = $$props.data
</script>

<svelte:head>
	<title>Willkommen | {title} | {name}</title>
</svelte:head>

<div class="$text-center">
	<img src="https://media.giphy.com/media/l378ryVoDmMwKoSt2/giphy.gif" alt="Hund auf Skateboard" />
</div>

<style lang="scss">
	@import '$variables';
</style>
