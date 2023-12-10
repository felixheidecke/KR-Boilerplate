<script lang="ts">
	import classnames from 'classnames'

	import type { XioniGallery } from '$lib/boilerplate/libraries/xioni/galleries.types'

	// --- Props -------------------------------------------------------------------------------------

	export let gallery: XioniGallery
	export let basePath: string = ''
	export let linkDelimiter: string = '_'

	// --- Data --------------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'XioniGallery'

	function makeLink(slug: string, id: number | string) {
		return basePath + slug + linkDelimiter + id
	}

	// --- Lifecycle ---------------------------------------------------------------------------------
</script>

<ul class={classnames(baseName, $$props.class)}>
	{#each gallery as { id, title, slug }}
		<li class="{baseName}__item">
			<a class="{baseName}__item-link" href={makeLink(slug, id)}>{title}</a>
		</li>
	{/each}
</ul>
