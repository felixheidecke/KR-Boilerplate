<script lang="ts">
	import type { XioniGalleryProps } from './XioniGallery.types'

	// --- Props -------------------------------------------------------------------------------------

	export let gallery: XioniGalleryProps['gallery']
	export let basePath: XioniGalleryProps['basePath'] = ''
	export let linkDelimiter: XioniGalleryProps['linkDelimiter'] = '_'
	export let exClass: XioniGalleryProps['exClass'] = ''

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
