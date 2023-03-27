<script>
	const { articles } = $$props.data
</script>

<h1 class="$text-center $my-3">Artikel</h1>

<ol class="$flex $flex-column $gap">
	{#each articles as article}
		<XioniArticleTile tag="li" {article} basePath="/xioni/artikel/" />
	{/each}
</ol>
