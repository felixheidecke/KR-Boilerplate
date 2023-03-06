<script>
	const { title } = $$props.data.stammdaten
</script>

<svelte:head>
	<title>Impressum | {title}</title>
</svelte:head>

<div>
	<h1>Impressum</h1>

	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quas, sit provident vel sint odit
		impedit modi optio, consequuntur repellat omnis aliquid nisi. Deserunt iure impedit odio culpa?
		Soluta, provident.
	</p>
</div>

<style lang="scss">
	@import '$variables';
</style>
