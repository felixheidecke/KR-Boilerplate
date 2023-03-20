<script>
	const { events } = $$props.data
</script>

<h1 class="$text-center $my-3">Events</h1>

<ol class="$flex $flex-column $gap">
	{#each events as event}
		<XioniEventTile tag="li" {event} basePath="/xioni/events/" />
	{/each}
</ol>

<!-- Dokumentation: https://ogy.de/a1y1 -->
