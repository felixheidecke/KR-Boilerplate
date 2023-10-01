<script lang="ts">
	import './XioniArticleTile.scss'

	import { format } from '$lib/boilerplate/utils/formatDate'
	import { goto } from '$app/navigation'
	import { LOCALE } from '$lib/boilerplate/constants'
	import { page } from '$app/stores'
	import classnames from 'classnames'

	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'
	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let article: XioniCMS.Article
	export let baseName: string = 'XioniArticleTile'
	export let linkText: string = 'Weiterlesen'
	export let tag: string = 'div'
	export let link: string | undefined = `${$page.url.pathname}${article.slug}_${article.id}`

	// -----------------------------------------------------------------------------------------------

	const { title, date, image, teaser, author } = article
</script>

<svelte:element this={tag} {...$$restProps} class={classnames(baseName, $$props.class)}>
	{#if image}
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<img
			class="{baseName}__image"
			class:$pointer={!!link}
			src={image.srcset?.small}
			alt={image.alt}
			on:click={() => {
				if (link) goto(link)
			}} />
	{/if}
	<h2 class="{baseName}__title">
		{title}
	</h2>
	<ul class="{baseName}__metadata">
		{#if author}
			<li class="{baseName}__author">
				<Icon name="far fa-user" class="$mr-1/4" />
				Von {author}
			</li>
		{/if}
		<li class="{baseName}__date">
			<Icon name="far fa-calendar-alt" class="$mr-1/4" />
			<time datetime={date.toLocaleDateString(LOCALE)}>
				{format(date, 'd. LLLL y')}
			</time>
		</li>
	</ul>
	<p class="{baseName}__teaser">
		{@html teaser}
	</p>
	{#if link}
		<Link to={link} class="{baseName}__link $pointer $row-reverse" icon="fas fa-angle-right">
			{linkText}
		</Link>
	{/if}
</svelte:element>
