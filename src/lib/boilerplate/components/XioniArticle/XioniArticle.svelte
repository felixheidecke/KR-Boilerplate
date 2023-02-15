<script lang="ts">
	import './XioniArticle.scss'

	import classnames from 'classnames'
	import { format } from 'date-fns'
	import { de } from 'date-fns/locale/index.js'
	import type { XioniArticle } from '$lib/boilerplate/libraries/xioni/article.types'

	// --- Components -------------------

	import Picture from '../Picture/Picture.svelte'
	import Link from '../Link/Link.svelte'

	// --- Props ------------------------

	const { author, content, date, id, image, pdf, text, title, website } =
		$$props.article as XioniArticle
	const baseName = $$props['ex-class'] || 'XioniArticle'
	const className = classnames(baseName, $$props.class)
</script>

<article class={className} id={'xioni-article-' + id}>
	{#if image}
		<Picture class={baseName + '__image'} src={image.thumbSrc} tablet={image.src} alt={image.alt} />
	{/if}
	<h2 class={baseName + '__title $mt-0@tablet-up'}>
		{title}
	</h2>
	{#if author || date}
		<div class={baseName + '__meta'}>
			{#if author}
				<span class={baseName + '__author'}>Von {author}</span>
			{/if}
			{#if author && date} | {/if}
			{#if date}
				<time class={baseName + '__date'}>
					{format(date, 'PPP', { locale: de })}
				</time>
			{/if}
		</div>
	{/if}
	<div class={baseName + '__teaser'}>
		{@html text}
	</div>

	{#if content}
		<div class={baseName + '__content'}>
			{#each content as { image, text }}
				{#if image}
					<Picture
						src={image.src}
						ex-class={baseName + '__content-image'}
						alt={image.alt}
						align={image.align}
					/>
				{/if}
				{#if text}
					{@html text}
				{/if}
			{/each}
		</div>
	{/if}

	{#if pdf}
		<Link to={pdf.src} class={baseName + '__pdf'} icon="fas fa-file-pdf">
			{pdf.title}
		</Link>
	{/if}

	{#if website}
		<Link to={website.toString()} class={baseName + '__website'} icon="fas fa-link" />
	{/if}

	<slot />
</article>
