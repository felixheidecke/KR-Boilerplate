<script lang="ts">
	import './XioniEventTile.css'

	import { LOCALE } from '$lib/boilerplate/constants'
	import { formatFromTo } from '$lib/boilerplate/utils/format-date'
	import { goto } from '$app/navigation'
	import classNames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniEventTileProps } from './XioniEventTile.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let id: XioniEventTileProps['id'] = ''
	export let basePath: XioniEventTileProps['basePath'] = ''
	export let event: XioniEventTileProps['event']
	export let linkDelimiter: XioniEventTileProps['linkDelimiter'] = '_'
	export let linkText: XioniEventTileProps['linkText'] = 'Mehr erfahren'
	export let tag: XioniEventTileProps['tag'] = 'div'
	export let exClass: XioniEventTileProps['exClass']

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const { title, image, description, starts, ends } = event
	const link = basePath + event.slug + linkDelimiter + event.id
	const baseName = exClass || 'XioniEventTile'
	const className = classNames(baseName, $$props.class)
</script>

<svelte:element this={tag} {id} class={className}>
	{#if image}
		<img
			class="{baseName}__image"
			src={image.thumbSrc}
			alt={image.alt}
			on:click={() => goto(link)}
		/>
	{/if}
	<h2 class="{baseName}__title">
		{title}
	</h2>
	<h3 class="{baseName}__date">
		<time datetime={starts.toLocaleDateString(LOCALE)}>
			{@html formatFromTo(starts, ends)}
		</time>
	</h3>
	<div class="{baseName}__description">
		{@html description}
	</div>
	<Link to={link} class="{baseName}__link $row-reverse" icon="fas fa-angle-right">
		{linkText}
	</Link>
</svelte:element>
