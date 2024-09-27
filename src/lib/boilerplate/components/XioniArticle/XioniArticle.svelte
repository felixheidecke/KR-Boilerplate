<script lang="ts">
	import './XioniArticle.scss'

	import { format } from 'date-fns'
	import { de } from 'date-fns/locale'
	import classnames from 'classnames'

	import type { XioniCMS } from '$lib/boilerplate/xioni/types'
	import type { Prettify } from '$lib/boilerplate/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'
	import Button from '../Button/Button.svelte'
	import ButtonRow from '../ButtonRow/ButtonRow.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let article: Prettify<XioniCMS.Article>
	export let baseName = 'XioniArticle'

	// -----------------------------------------------------------------------------------------------
	const { author, date, content, image, teaser, title, links } = article
	const hasMetadata = author || date
</script>

<article {...$$restProps} class={classnames(baseName, $$props.class)}>
	{#if image}
		<figure class="{baseName}__wrapper">
			<img class="{baseName}__image" src={image.src} alt={image.description} />
			{#if image.description}
				<figcaption class="{baseName}__image-caption">
					{image.description}
				</figcaption>
			{/if}
		</figure>
	{/if}

	<h1 class="{baseName}__title">
		{title}
	</h1>

	{#if hasMetadata}
		<ul class="{baseName}__metadata">
			{#if author}
				<li class="{baseName}__author">
					<Icon name="user" class="$mr-1/4" />
					<span>Von {author}</span>
				</li>
			{/if}
			{#if date}
				<li class="{baseName}__date">
					<Icon name="far fa-calendar-alt" class="$mr-1/4" />
					<time>{format(date, 'PPP', { locale: de })}</time>
				</li>
			{/if}
		</ul>
	{/if}

	<p class="{baseName}__teaser">
		{@html teaser}
	</p>

	{#if content?.length}
		<div class="{baseName}__content">
			{#each content as { image, title, text }}
				{#if title}
					<h3 class="{baseName}__content-title">
						{title}
					</h3>
				{/if}
				{#if text || image}
					<p class="{baseName}__content-text">
						{#if image}
							<figure
								class={classnames(
									`${baseName}__content-image `,
									`${baseName}__content-image--${image.align}`
								)}>
								<img src={image.src} alt={image.description || title} />
								{#if image.description}
									<figcaption class="{baseName}__content-image-caption">
										{image.description}
									</figcaption>
								{/if}
							</figure>
						{/if}
						{#if text}
							{@html text}
						{/if}
					</p>
				{/if}
			{/each}
		</div>
	{/if}

	{#if links}
		<ButtonRow class="{baseName}__button-row">
			{#each links as link}
				<Button to={link.url} icon={link.type}>
					{link.title}
				</Button>
			{/each}
		</ButtonRow>
	{/if}
</article>
