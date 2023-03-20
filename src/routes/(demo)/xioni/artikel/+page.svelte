<script>
	const { articles } = $$props.data
</script>

<h1 class="$text-center $my-3">Artikel</h1>

<Grid tag="ul" gap>
	{#each articles as article}
		<Grid tag="li" size="1-2">
			<XioniArticleTile {article} basePath="/xioni/artikel/" />
		</Grid>
	{/each}
</Grid>
