<script lang="ts">
	import './XioniEventTile.scss'

	import { format } from '$lib/utils/formatDate'
	import { goto } from '$app/navigation'
	import { LOCALE } from '$lib/boilerplate/constants'
	import classNames from 'classnames'

	import type { XioniCMS } from '$lib/boilerplate/xioni/cms/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let basePath: string = ''
	export let event: XioniCMS.Event
	export let exClass: string = ''
	export let linkDelimiter: string = '_'
	export let linkText: string = 'Mehr erfahren'
	export let tag: string = 'div'

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const { title, image, description, starts, ends, duration, organizer } = event
	const link = basePath + event.slug + linkDelimiter + event.id

	// CSS Classname
	const baseName = exClass || 'XioniEventTile'
</script>

<svelte:element
	this={tag}
	class={classNames(baseName, $$props.class)}
	itemscope
	itemtype="https://schema.org/Event">
	<meta itemprop="startDate" content={format(starts, 'yyyy-MM-dd')} />
	<meta itemprop="endDate" content={format(ends, 'yyyy-MM-dd')} />
	<meta itemprop="organizer" content={organizer} />

	{#if image}
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<img
			itemprop="image"
			class="{baseName}__image"
			src={image.thumbSrc}
			alt={image.alt || title}
			on:click={() => goto(link)} />
	{/if}

	<h2 itemprop="name" class="{baseName}__title">
		{title}
	</h2>

	<h3 class="{baseName}__date">
		<time datetime={starts.toLocaleDateString(LOCALE)}>
			{duration}
		</time>
	</h3>

	{#if description}
		<div itemprop="description" class="{baseName}__description">
			{@html description}
		</div>
	{/if}

	<Link to={link} class="{baseName}__link $row-reverse" icon="fas fa-angle-right">
		{linkText}
	</Link>
</svelte:element>
