<script>
	const { events } = $$props.data
</script>

<h1 class="$text-center $my-3">Events</h1>

<Grid tag="ul" gap>
	{#each events as event}
		<Grid tag="li" size="1-2">
			<XioniEventTile {event} basePath="/events/" />
		</Grid>
	{/each}
</Grid>

<!-- Dokumentation: https://ogy.de/a1y1 -->
