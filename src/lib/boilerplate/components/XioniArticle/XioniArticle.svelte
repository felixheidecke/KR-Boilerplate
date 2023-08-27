<script lang="ts">
	import './XioniArticle.scss'

	import { format } from 'date-fns'
	import cn from 'classnames'
	import de from 'date-fns/locale/de/index.js'
	import type { XioniArticle } from '$lib/boilerplate/libraries/xioni/articles.types'

	// --- [ Components ] ----------------------------------------------------------------------------
	import Icon from '../Icon/Icon.svelte'
	import Button from '../Button/Button.svelte'
	import ButtonRow from '../ButtonRow/ButtonRow.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------
	export let article: XioniArticle
	export let id: string | undefined = undefined

	// -----------------------------------------------------------------------------------------------
	const { author, content, date, image, pdf, text, title, website } = article
	const hasMetadata = author || date || website
</script>

<article class={cn('XioniArticle', $$props.class)} {id}>
	{#if image}
		<figure class="XioniArticle__wrapper">
			<img class="XioniArticle__image" src={image.src} alt={image.alt} />
			{#if image.alt}
				<figcaption class="XioniArticle__image-caption">
					{image.alt}
				</figcaption>
			{/if}
		</figure>
	{/if}

	<h2 class="XioniArticle__title">
		{title}
	</h2>

	{#if hasMetadata}
		<ul class="XioniArticle__metadata">
			{#if author}
				<li class="XioniArticle__author">
					<Icon name="far fa-user" class="$mr-1/4" />
					<span>Von {author}</span>
				</li>
			{/if}
			{#if date}
				<li class="XioniArticle__date">
					<Icon name="far fa-calendar-alt" class="$mr-1/4" />
					<time>{format(date, 'PPP', { locale: de })}</time>
				</li>
			{/if}
		</ul>
	{/if}

	<div class="XioniArticle__teaser">
		{@html text}
	</div>

	{#if content}
		<div class="XioniArticle__content">
			{#each content as { image, text }}
				{#if image}
					<figure
						class="XioniArticle__content-image"
						class:XioniArticle__content-image--left={image.align === 'left'}
						class:XioniArticle__content-image--right={image.align === 'right'}>
						<img src={image.src} alt={image.alt} />
						{#if image.alt}
							<figcaption class="XioniArticle__content-image-caption">
								{image.alt}
							</figcaption>
						{/if}
					</figure>
				{/if}
				{#if text}
					{@html text}
				{/if}
			{/each}
		</div>
	{/if}

	<ButtonRow class="XioniArticle__button-row">
		{#if pdf}
			<Button to={pdf.src} class={'XioniArticle__pdf'} icon="fas fa-file-pdf">
				{pdf.title}
			</Button>
		{/if}

		{#if website}
			<Button to={website.toString()} icon="fas fa-link">{website.host}</Button>
		{/if}
	</ButtonRow>
</article>
