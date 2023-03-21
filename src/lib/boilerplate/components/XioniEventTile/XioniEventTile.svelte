<script lang="ts">
	import './XioniEventTile.css'

	import { LOCALE } from '$lib/boilerplate/constants'
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
	<h2 class="XioniEventTile__title">
		{title}
	</h2>
	<h3 class="XioniEventTile__date">
		<time datetime={starts.toLocaleDateString(LOCALE)}>
			{@html formatFromTo(starts, ends)}
		</time>
	</h3>
	<div class="XioniEventTile__description">
		{@html description}
	</div>
	<Link to={link} class="XioniEventTile__link $row-reverse" icon="fas fa-angle-right">
		{linkText}
	</Link>
</svelte:element>
