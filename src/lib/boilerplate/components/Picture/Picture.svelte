<script lang="ts">
	import './picture.css'

	import type { PictureProps } from './Picture.types'
	import classnames from 'classnames'

	// --- Props -------------------------

	export let align: PictureProps['align'] = undefined
	export let alt: PictureProps['alt'] = ''
	export let desktop: PictureProps['desktop'] = undefined
	export let loading: PictureProps['loading'] = 'lazy'
	export let src: PictureProps['src']
	export let tablet: PictureProps['tablet'] = undefined
	export let widescreen: PictureProps['widescreen'] = undefined

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'Picture'

	$: className = classnames(
		baseName,
		$$props.class as string,
		!align || [baseName, '--', align].join('')
	)
</script>

<picture>
	{#if widescreen}
		<source srcset={widescreen} media="(min-width: 1441px)" />
	{/if}
	{#if desktop}
		<source srcset={desktop} media="(min-width: 1025px)" />
	{/if}
	{#if tablet}
		<source srcset={tablet} media="(min-width: 621px)" />
	{/if}
	<img class={className} srcset={src} {alt} {loading} />
</picture>
