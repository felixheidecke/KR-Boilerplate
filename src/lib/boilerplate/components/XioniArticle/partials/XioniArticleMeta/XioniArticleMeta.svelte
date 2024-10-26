<script lang="ts">
	import './XioniArticleMeta.css'

	import { format } from 'date-fns'
	import { de } from 'date-fns/locale'
	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '$lib/boilerplate/components/Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let author: XioniCMS.Article['author'] = ''
	export let date: XioniCMS.Article['date'] | undefined = undefined

	// -----------------------------------------------------------------------------------------------

	export let baseName = 'XioniArticleMeta'
</script>

<ul class={baseName}>
	{#if author}
		<li class="{baseName}__author">
			<Icon name="far fa-user" class="$mr-1/4" />
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
