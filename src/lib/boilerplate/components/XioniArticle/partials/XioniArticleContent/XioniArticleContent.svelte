<script lang="ts">
	import './XioniArticleContent.scss'

	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Figure from '$lib/boilerplate/components/Figure/Figure.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let baseName = 'XioniArticleContent'
	export let title: XioniCMS.ArticleContent['title']
	export let text: XioniCMS.ArticleContent['text']
	export let image: XioniCMS.ArticleContent['image'] = undefined

	// -----------------------------------------------------------------------------------------------
</script>

{#if title}
	<h3 class="{baseName}__title">
		{title}
	</h3>
{/if}
{#if text || image}
	<p class="{baseName}__text">
		{#if image}
			<Figure
				baseName="{baseName}Image"
				class="{baseName}Image--{image.align}"
				src={image.src}
				alt={image.description}
				caption={image.description} />
		{/if}
		{#if text}
			{@html text}
		{/if}
	</p>
{/if}
