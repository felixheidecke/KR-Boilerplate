<!--

  <XioniEventTile> Parameter:
  ***************************

	"event"  		      [Object]
	"basePath"? 		  [String]
	"linkDelimiter"?  [String] = '_'
	"linkText"?       [String] = 'Mehr erfahren'

-->
<script>
	export let data

	const { events } = data
</script>

<h1 class="$text-center $my-2">Unsere Events in 2023</h1>

<Grid tag="ul" gap rowGap>
	{#each events as event}
		<Grid tag="li" size="1-2">
			<XioniEventTile {event} basePath="/events/" />
		</Grid>
	{/each}
</Grid>
