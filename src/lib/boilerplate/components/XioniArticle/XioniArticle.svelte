<script lang="ts">
	import './XioniArticle.scss'

	import classnames from 'classnames'
	import { format } from 'date-fns'
	import { de } from 'date-fns/locale/index.js'
	import type { XioniArticle } from '$lib/boilerplate/libraries/xioni/article.types'

	// --- Components -------------------

	import Picture from '../Picture/Picture.svelte'
	import Link from '../Link/Link.svelte'
	import Icon from '../Icon/Icon.svelte'

	// --- Props ------------------------

	const { author, content, date, id, image, pdf, text, title, website } =
		$$props.article as XioniArticle
	const baseName = $$props['ex-class'] || 'XioniArticle'
	const className = classnames(baseName, $$props.class)

	const hasMetadata = author || date || pdf || website
</script>

<article class={className} id={'xioni-article-' + id}>
	{#if image}
		<img class={baseName + '__image'} src={image.src} alt={image.alt} />
	{/if}
	<h1 class={baseName + '__title'}>
		{title}
	</h1>

	{#if hasMetadata}
		<ul class={baseName + '__metadata'}>
			{#if author}
				<li>
					<Icon name="far fa-user" class="$mr-1/4" />
					<span class={baseName + '__author'}>Von {author}</span>
				</li>
			{/if}
			{#if date}
				<li>
					<Icon name="far fa-calendar-alt" class="$mr-1/4" />
					<time class={baseName + '__date'}>{format(date, 'PPP', { locale: de })}</time>
				</li>
			{/if}

			{#if pdf}
				<li>
					<Link to={pdf.src} class={baseName + '__pdf'} icon="fas fa-file-pdf">
						{pdf.title}
					</Link>
				</li>
			{/if}

			{#if website}
				<li>
					<Link to={website.toString()} class={baseName + '__website'} icon="fas fa-link" />
				</li>
			{/if}
		</ul>
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

	<slot />
</article>