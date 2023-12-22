<script lang="ts">
	import type { XioniCMS } from '$lib/boilerplate/xioni/cms/types'

	// --- Props -------------------------------------------------------------------------------------

	export let gallery: XioniCMS.Gallery
	export let basePath: string = ''
	export let linkDelimiter: string = '_'
	export let exClass: string = ''

	// --- Data --------------------------------------------------------------------------------------

	const baseClass = exClass || 'XioniGallery'

	function makeLink(slug: string, id: number | string) {
		return basePath + slug + linkDelimiter + id
	}

	// --- Lifecycle ---------------------------------------------------------------------------------
</script>

<ul class={baseClass}>
	{#each gallery as { id, title, slug }}
		<li class="{baseClass}__item">
			<a class="{baseClass}__item-link" href={makeLink(slug, id)}>{title}</a>
		</li>
	{/each}
</ul>
