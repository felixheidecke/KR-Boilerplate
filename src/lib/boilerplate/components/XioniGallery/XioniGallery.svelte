<script lang="ts">
	import { page } from '$app/stores'
	import classnames from 'classnames'
	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- Props -------------------------------------------------------------------------------------

	export let gallery: XioniCMS.Gallery
	export let baseName = 'XioniGallery'
	export let baseLink: string = $page.url.pathname

	// -----------------------------------------------------------------------------------------------

	function makeLink(slug: string, id: number | string) {
		return baseLink + slug + '_' + id
	}
</script>

<ul class={classnames(baseName, $$props.class)}>
	{#each gallery as { id, title, slug }}
		<li class="{baseName}__item">
			<a class="{baseName}__item-link" href={makeLink(slug, id)}>{title}</a>
		</li>
	{/each}
</ul>
