<script lang="ts">
	import './XioniEventTile.scss'

	import { LOCALE } from '$lib/boilerplate/constants'
	import classNames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniEventTileProps } from './XioniEventTile.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let basePath: XioniEventTileProps['basePath'] = ''
	export let event: XioniEventTileProps['event']
	export let exClass: XioniEventTileProps['exClass'] = ''
	export let linkDelimiter: XioniEventTileProps['linkDelimiter'] = '_'
	export let linkText: XioniEventTileProps['linkText'] = 'Mehr erfahren'
	export let tag: XioniEventTileProps['tag'] = 'div'

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const { title, image, description, starts, ends, duration, organizer } = event
	const link = basePath + event.slug + linkDelimiter + event.id

	// CSS Classname
	const baseName = exClass || 'XioniEventTile'
	const className = classNames(baseName, $$props.class)
</script>

<svelte:element this={tag} class={className} itemscope itemtype="https://schema.org/Event">
	<meta itemprop="startDate" content={starts.toUTCString()} />
	<meta itemprop="endDate" content={ends.toUTCString()} />
	<meta itemprop="organizer" content={organizer} />

	{#if image}
		<img itemprop="image" class="{baseName}__image" src={image.thumbSrc} alt={image.alt} />
	{/if}

	<h2 itemprop="name" class="{baseName}__title">
		{title}
	</h2>

	<h3 class="{baseName}__date">
		<time datetime={starts.toLocaleDateString(LOCALE)}>
			{duration}
		</time>
	</h3>

	<div itemprop="description" class="{baseName}__description">
		{@html description}
	</div>

	<Link to={link} class="{baseName}__link $row-reverse" icon="fas fa-angle-right">
		{linkText}
	</Link>
</svelte:element>
