<script lang="ts">
	import './XioniEventTile.css'

	import { formatFromTo } from '$lib/boilerplate/utils/format-date'
	import { goto } from '$app/navigation'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniEvent } from '$lib/boilerplate/libraries/xioni/event.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'
	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let basePath = ''
	export let linkDelimiter = '_'
	export let linkText = 'Mehr erfahren'
	export let event: XioniEvent

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const { title, id, slug, image, description, starts, ends } = event
	const link = basePath + slug + linkDelimiter + id
</script>

<div class="XioniEventTile" on:click={() => goto(link)}>
	{#if image}
		<img class="XioniEventTile__image" src={image.thumbSrc} alt={image.alt} />
	{/if}
	<h5 class="XioniEventTile__title">
		{title}
	</h5>
	<ul class="XioniEventTile__metadata">
		<li class="XioniEventTile__date">
			<Icon name="far fa-calendar-alt" class="$mr-1/4" />
			<time>{@html formatFromTo(starts, ends)}</time>
		</li>
	</ul>
	<div class="XioniEventTile__description">
		{@html description}
	</div>
	<Link to={link} class="XioniEventTile__link $row-reverse" icon="fas fa-angle-right">
		{linkText}
	</Link>
</div>