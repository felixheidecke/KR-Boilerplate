<script lang="ts">
	import './XioniArticleTile.scss'

	import { format } from '$lib/boilerplate/utils/format-date'
	import { goto } from '$app/navigation'
	import { LOCALE } from '$lib/boilerplate/constants'
	import cn from 'classnames'
	import type { XioniArticle } from '$lib/boilerplate/libraries/xioni/articles.types'

	// --- [ Components ] ----------------------------------------------------------------------------
	import Link from '../Link/Link.svelte'
	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------
	export let article: XioniArticle
	export let basePath: string = ''
	export let linkDelimiter: string = '_'
	export let linkText: string = 'Weiterlesen'
	export let tag: string = 'div'

	// -----------------------------------------------------------------------------------------------
	const { title, date, image, text, author, content } = article
	const link = basePath + article.slug + linkDelimiter + article.id
</script>

<svelte:element this={tag} class={cn('XioniArticleTile', $$props.class)}>
	{#if image}
		<img
			class="XioniArticleTile__image"
			class:$pointer={!!content}
			src={image.thumbSrc}
			alt={image.alt}
			on:click={() => {
				if (content) goto(link)
			}} />
	{/if}
	<h2 class="XioniArticleTile__title">
		{title}
	</h2>
	<ul class="XioniArticleTile__metadata">
		{#if author}
			<li class="XioniArticleTile__author">
				<Icon name="far fa-user" class="$mr-1/4" />
				Von {author}
			</li>
		{/if}
		<li class="XioniArticleTile__date">
			<Icon name="far fa-calendar-alt" class="$mr-1/4" />
			<time datetime={date.toLocaleDateString(LOCALE)}>
				{format(date, 'd. LLLL Y')}
			</time>
		</li>
	</ul>
	<div class="XioniArticleTile__text">
		{@html text}
	</div>
	{#if content}
		<Link to={link} class="XioniArticleTile__link $pointer $row-reverse" icon="fas fa-angle-right">
			{linkText}
		</Link>
	{/if}
</svelte:element>
