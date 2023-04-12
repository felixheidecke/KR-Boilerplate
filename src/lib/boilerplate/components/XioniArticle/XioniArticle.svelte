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
	import Button from '../Button/Button.svelte'
	import { ButtonPropsTarget } from '../Button/Button.types'

	// --- Props ------------------------

	// prettier-ignore
	const {
		author,
		content,
		date,
		id,
		image,
		pdf,
		text,
		title,
		website
	} = $$props.article as XioniArticle

	const baseName = $$props['ex-class'] || 'XioniArticle'
	const className = classnames(baseName, $$props.class)
	const hasMetadata = author || date || website
</script>

<article class={className} id={'xioni-article-' + id}>
	{#if image}
		<img class={baseName + '__image'} src={image.src} alt={image.alt} />
	{/if}
	<h2 class={baseName + '__title'}>
		{title}
	</h2>

	{#if hasMetadata}
		<ul class={baseName + '__metadata'}>
			{#if author}
				<li class={baseName + '__author'}>
					<Icon name="far fa-user" class="$mr-1/4" />
					<span>Von {author}</span>
				</li>
			{/if}
			{#if date}
				<li class={baseName + '__date'}>
					<Icon name="far fa-calendar-alt" class="$mr-1/4" />
					<time>{format(date, 'PPP', { locale: de })}</time>
				</li>
			{/if}

			{#if website}
				<li class={baseName + '__website'}>
					<Link to={website.toString()} icon="fas fa-link" />
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
						align={image.align} />
				{/if}
				{#if text}
					{@html text}
				{/if}
			{/each}
		</div>
	{/if}

	{#if pdf}
		<Button
			to={pdf.src}
			target={ButtonPropsTarget.BLANK}
			class={baseName + '__pdf'}
			icon="fas fa-file-pdf">
			{pdf.title}
		</Button>
	{/if}
</article>
