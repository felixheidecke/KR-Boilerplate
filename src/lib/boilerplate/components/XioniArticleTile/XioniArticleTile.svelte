<script lang="ts">
	import './XioniArticleTile.scss'

	import { format } from '$lib/boilerplate/utils/format-date'
	import { goto } from '$app/navigation'
	import { LOCALE } from '$lib/boilerplate/constants'
	import classNames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniArticleTileProps } from './XioniArticleTile.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'
	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let article: XioniArticleTileProps['article']
	export let basePath: XioniArticleTileProps['basePath'] = ''
	export let exClass: XioniArticleTileProps['exClass'] = ''
	export let linkDelimiter: XioniArticleTileProps['linkDelimiter'] = '_'
	export let linkText: XioniArticleTileProps['linkText'] = 'Weiterlesen'
	export let tag: XioniArticleTileProps['tag'] = 'div'

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const { title, date, image, text, author, content } = article
	const link = basePath + article.slug + linkDelimiter + article.id
	const baseName = exClass || 'XioniArticleTile'
	const className = classNames(baseName, $$props.class)
</script>

<svelte:element this={tag} class={baseName}>
	{#if image}
		<img
			class="{className}__image"
			class:$pointer={!!content}
			src={image.thumbSrc}
			alt={image.alt}
			on:click={() => {
				if (content) goto(link)
			}} />
	{/if}
	<h2 class="{className}__title">
		{title}
	</h2>
	<ul class="{className}__metadata">
		{#if author}
			<li class="{className}__author">
				<Icon name="far fa-user" class="$mr-1/4" />
				Von {author}
			</li>
		{/if}
		<li class="{className}__date">
			<Icon name="far fa-calendar-alt" class="$mr-1/4" />
			<time datetime={date.toLocaleDateString(LOCALE)}>
				{format(date, 'd. LLLL Y')}
			</time>
		</li>
	</ul>
	<div class="{className}__text">
		{@html text}
	</div>
	{#if content}
		<Link to={link} class="{className}__link $pointer $row-reverse" icon="fas fa-angle-right">
			{linkText}
		</Link>
	{/if}
</svelte:element>
