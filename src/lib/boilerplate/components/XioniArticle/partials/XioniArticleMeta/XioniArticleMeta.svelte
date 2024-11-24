<script lang="ts">
	import './XioniArticleMeta.css'

	import { format } from 'date-fns'
	import { de } from 'date-fns/locale'
	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '$lib/boilerplate/components/Icon/Icon.svelte'
	import Fontello from '$lib/boilerplate/components/Fontello/Fontello.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let author: XioniCMS.Article['author'] = ''
	export let date: XioniCMS.Article['date'] | undefined = undefined

	// -----------------------------------------------------------------------------------------------

	export let baseName = 'XioniArticleMeta'
</script>

<ul class={baseName}>
	{#if author}
		<li class="{baseName}__author">
			<Fontello name="user" />
			<span>Von {author}</span>
		</li>
	{/if}
	{#if date}
		<li class="{baseName}__date">
			<Fontello name="calendar-empty" />
			<time>{format(date, 'PPP', { locale: de })}</time>
		</li>
	{/if}
</ul>
