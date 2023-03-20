<script lang="ts">
	import './XioniEventTile.css'

	import { formatFromTo } from '$lib/boilerplate/utils/format-date'
	import { goto } from '$app/navigation'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniEventTileProps } from './XioniEventTile.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let tag: XioniEventTileProps['tag'] = 'div'
	export let basePath: XioniEventTileProps['basePath'] = ''
	export let linkDelimiter: XioniEventTileProps['linkDelimiter'] = '_'
	export let linkText: XioniEventTileProps['linkText'] = 'Mehr erfahren'
	export let event: XioniEventTileProps['event']

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const { title, id, slug, image, description, starts, ends } = event
	const link = basePath + slug + linkDelimiter + id
</script>

<svelte:element this={tag} class="XioniEventTile">
	{#if image}
		<img
			class="XioniEventTile__image"
			src={image.thumbSrc}
			alt={image.alt}
			on:click={() => goto(link)}
		/>
	{/if}
	<h3 class="XioniEventTile__title">
		{title}
	</h3>
	<time datetime={starts.toLocaleDateString('de-DE')} class="XioniEventTile__date">
		{@html formatFromTo(starts, ends)}
	</time>
	<div class="XioniEventTile__description">
		{@html description}
	</div>
	<Link to={link} class="XioniEventTile__link $row-reverse" icon="fas fa-angle-right">
		{linkText}
	</Link>
</svelte:element>
