<script lang="ts">
	import './XioniEventList.scss'
	import { formatFromTo } from '$lib/boilerplate/utils/format-date'
	import { goto } from '$app/navigation'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniEvents } from '$lib/boilerplate/libraries/xioni/event.types'

	type DetailPath = string

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'
	import Link from '../Link/Link.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let events: XioniEvents = []
	export let detailPath: DetailPath = ''
	export let linkDelimiter = '_'

	// --- [ Logic ] ---------------------------------------------------------------------------------

	function makeLink(slug: string, id: number | string) {
		return detailPath + slug + linkDelimiter + id
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

<ul class="XioniEventList">
	{#each events as event}
		<li class="XioniEventList__item $pointer" on:click={() => goto(makeLink(event.slug, event.id))}>
			{#if !event.image}
				<img
					class="XioniEventList__item-image"
					src="https://via.placeholder.com/800x450.png?text=Kein%20Bild"
					alt="kein Bild"
				/>
			{:else}
				<img
					class="XioniEventList__item-image"
					loading="lazy"
					src={event.image.thumbSrc}
					alt={event.image.alt}
				/>
			{/if}
			<div class="XioniEventList__item-body">
				<h5 class="XioniEventList__item-title">{event.title}</h5>

				<div>
					<Icon name="fas fa-calendar" class="$mr-1/2" />
					<date class="$font-italic">
						{@html formatFromTo(event.starts, event.ends)}
					</date>
				</div>
				{@html event.description}
				<Link to={makeLink(event.slug, event.id)} icon="fas fa-chevron-right">Mehr erfahren</Link>
			</div>
		</li>
	{/each}
</ul>
