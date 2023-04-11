<script>
	import { getMany } from '$lib/boilerplate/libraries/xioni/event'

	const getEvents = getMany(1289, { endsAfter: new Date() })
</script>

<h1>Events</h1>

{#await getEvents then events}
	<ol class="$flex $flex-column $gap">
		{#each events as event}
			<XioniEventTile tag="li" {event} basePath="/xioni/events/" />
		{/each}
	</ol>
{/await}

<!-- Dokumentation: https://ogy.de/a1y1 -->
