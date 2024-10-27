<script lang="ts">
	import './XioniAlbum.scss'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Lightbox from '../Lightbox/Lightbox.svelte'
	import classNames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------
	export let baseName = 'XioniAlbum'
	export let images: XioniCMS.Album['images'] = []
</script>

<Lightbox>
	<ul {...$$restProps} class={classNames(baseName, $$props.class)}>
		{#each images as { src, srcset, description }}
			<li class="{baseName}__item">
				<img
					class="{baseName}__image"
					src={srcset?.small}
					data-lightbox={src}
					loading="lazy"
					alt={description} />
			</li>
		{/each}
	</ul>
</Lightbox>
