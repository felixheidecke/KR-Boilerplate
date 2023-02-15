<script lang="ts">
	import './XioniArticleList.scss'

	// --- Components --------------------------------------------------------------------------------

	import Article from '../XioniArticle/XioniArticle.svelte'
	import Button from '../Button/Button.svelte'
	import type { XioniArticle, XioniArticles } from '$lib/boilerplate/libraries/xioni/article.types'
	import { omit } from 'lodash-es'

	// --- Data --------------------------------------------------------------------------------------

	export let articles: XioniArticles
	export let expanded = false
	export let buttonText = 'Weiterlesen'
	export let detailPath = ''
	export let linkDelimiter = '_'

	function makeLink(slug: string, id: number | string) {
		return detailPath + slug + linkDelimiter + id
	}

	function prepareArticle(article: XioniArticle): XioniArticle {
		if (expanded) return article

		return omit(article, ['content', 'pdf', 'website'])
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

{#each articles as article}
	<Article article={prepareArticle(article)}>
		{#if !expanded}
			<Button
				to={makeLink(article.slug, article.id)}
				class="XioniArticle__read-more"
				icon="fas fa-chevron-right"
				reverse
			>
				{buttonText}
			</Button>
		{/if}
	</Article>
{:else}
	<p class="XioniArticleList__is-empty">Keine Artikel gefunden …</p>
{/each}
