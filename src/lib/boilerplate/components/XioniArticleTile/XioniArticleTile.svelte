<script lang="ts">
	import './XioniArticleTile.css'

	import { format } from '$lib/boilerplate/utils/format-date'
	import { goto } from '$app/navigation'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniArticle } from '$lib/boilerplate/libraries/xioni/article.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'
	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let basePath = ''
	export let linkDelimiter = '_'
	export let linkText = 'Weiterlesen'
	export let article: XioniArticle

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const { title, id, slug, date, image, text, author } = article
	const link = basePath + slug + linkDelimiter + id
</script>

<div class="XioniArticleTile">
	{#if image}
		<img
			class="XioniArticleTile__image $pointer"
			src={image.thumbSrc}
			alt={image.alt}
			on:click={() => goto(link)}
		/>
	{/if}
	<h5 class="XioniArticleTile__title">
		{title}
	</h5>
	<ul class="XioniArticleTile__metadata">
		{#if author}
			<li class="XioniArticleTile__author">
				<Icon name="far fa-user" class="$mr-1/4" />
				Von {author}
			</li>
		{/if}
		<li class="XioniArticleTile__date">
			<Icon name="far fa-calendar-alt" class="$mr-1/4" />
			<time datetime={date.toLocaleDateString('de')}>
				{format(date, 'd. LLLL Y')}
			</time>
		</li>
	</ul>
	<div class="XioniArticleTile__text">
		{@html text}
	</div>
	<Link to={link} class="XioniArticleTile__link $pointer $row-reverse" icon="fas fa-angle-right">
		{linkText}
	</Link>
</div>
