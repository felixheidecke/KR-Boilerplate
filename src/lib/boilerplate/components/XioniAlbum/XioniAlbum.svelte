<script lang="ts">
	import './XioniAlbum.scss'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniCMS } from '$lib/boilerplate/xioni/cms/XioniCMS.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Lightbox from '../Lightbox/Lightbox.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let images: XioniCMS.Album['images'] = []
</script>

<Lightbox>
	<ul class="XioniAlbum">
		{#each images as { src, srcset, alt }}
			<li class="XioniAlbum__item">
				<img
					class="XioniAlbum__image"
					src={srcset?.small}
					data-lightbox={src}
					loading="lazy"
					{alt} />
			</li>
		{/each}
	</ul>
</Lightbox>
