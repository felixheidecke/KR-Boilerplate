<script lang="ts">
	import './XioniArticle.scss'

	import classnames from 'classnames'
	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Figure from '../Figure/Figure.svelte'
	import Buttons from './partials/XioniArticleButtons/XioniArticleButtons.svelte'
	import Meta from './partials/XioniArticleMeta/XioniArticleMeta.svelte'
	import Content from './partials/XioniArticleContent/XioniArticleContent.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let article: XioniCMS.Article
	export let baseName = 'XioniArticle'

	// -----------------------------------------------------------------------------------------------
	const { author, date, content, image, pdf, teaser, title, website } = article
</script>

<article {...$$restProps} class={classnames(baseName, $$props.class)}>
	{#if image}
		<Figure baseName="{baseName}Image" src={image.src} caption={image.description} />
	{/if}

	<h1 class="{baseName}__title">
		{title}
	</h1>

	{#if author || date}
		<Meta {author} {date} />
	{/if}

	<p class="{baseName}__teaser">
		{@html teaser}
	</p>

	{#if content?.length}
		<div class="{baseName}__content">
			{#each content as { text, title, image }}
				<Content {text} {title} {image} />
			{/each}
		</div>
	{/if}

	{#if pdf || website}
		<Buttons {pdf} {website} />
	{/if}
</article>
