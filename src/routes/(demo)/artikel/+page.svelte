<!--

  <XioniArticleTile> Parameter:
  *****************************

	"article"        [Object]
	"basePath"?      [String] = ''
	"linkDelimiter"? [String] = '_'
	"linkText"?      [String] = 'Weiterlesen'

-->
<script>
	export let data

	const { articles } = data
</script>

<h1 class="$text-center $my-3">Artikel</h1>

<Grid tag="ul" gap rowGap>
	{#each articles as article}
		<Grid tag="li" size="1-2">
			<XioniArticleTile {article} basePath="/artikel/" />
		</Grid>
	{/each}
</Grid>
