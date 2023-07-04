<script lang="ts">
	import './XioniAlbum.scss'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniAlbum } from '$lib/boilerplate/libraries/xioni/galleries.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Lightbox from '../Lightbox/Lightbox.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let photos: XioniAlbum['photos'] = []
</script>

<Lightbox>
	<ul class="XioniAlbum">
		{#each photos as { src, thumbSrc, alt }}
			<li class="XioniAlbum__item">
				<img class="XioniAlbum__image" src={thumbSrc} data-lightbox={src} loading="lazy" {alt} />
			</li>
		{/each}
	</ul>
</Lightbox>
