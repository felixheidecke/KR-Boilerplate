<script lang="ts">
	import type { XioniGallery } from '$lib/boilerplate/libraries/xioni/gallery.types'

	// --- Props -------------------------------------------------------------------------------------

	export let gallery: XioniGallery
	export let detailPath = ''
	export let linkDelimiter = '_'

	// --- Data --------------------------------------------------------------------------------------

	const baseClass = $$props['ex-class'] || 'XioniGallery'

	function makeLink(slug: string, id: number | string) {
		return detailPath + slug + linkDelimiter + id
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
