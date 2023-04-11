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
	export let id: XioniEventTileProps['id'] = ''
	export let linkDelimiter: XioniEventTileProps['linkDelimiter'] = '_'
	export let linkText: XioniEventTileProps['linkText'] = 'Mehr erfahren'
	export let tag: XioniEventTileProps['tag'] = 'div'

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const { title, image, description, starts, ends, duration } = event
	const link = basePath + event.slug + linkDelimiter + event.id

	// CSS Classname
	const baseName = exClass || 'XioniEventTile'
	const className = classNames(baseName, $$props.class)
</script>

<svelte:element this={tag} {id} class={className}>
	{#if image}
		<img class="{baseName}__image" src={image.thumbSrc} alt={image.alt} />
	{/if}
	<h2 class="{baseName}__title">
		{title}
	</h2>
	<h3 class="{baseName}__date">
		<time datetime={starts.toLocaleDateString(LOCALE)}>
			{duration}
		</time>
	</h3>
	<div class="{baseName}__description">
		{@html description}
	</div>

	<Link to={link} class="{baseName}__link $row-reverse" icon="fas fa-angle-right">
		{linkText}
	</Link>
</svelte:element>
