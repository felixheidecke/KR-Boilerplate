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

<Grid tag="ul" gap rowGap>
	{#each articles as article}
		<Grid tag="li" size="1-2">
			<XioniArticleTile {article} basePath="/artikel/" />
		</Grid>
	{/each}
</Grid>
