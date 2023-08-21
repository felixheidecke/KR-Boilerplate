<script lang="ts">
	import { IS_MOBILE } from '$lib/boilerplate/stores/breakpoints'
	import './picture.scss'

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
	export let width: string | number | undefined = undefined
	export let height: string | number | undefined = undefined
	export let caption = ''

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'Picture'

	$: className = classnames(baseName, $$props.class as string)

	$: wrapperClassName = classnames(
		baseName + '__container',
		!align || [baseName, '__container--', align].join('')
	)

	$: style = width && !$IS_MOBILE ? `max-width: ${width}px;` : undefined
</script>

<picture class={wrapperClassName} {style}>
	{#if widescreen}
		<source srcset={widescreen} media="(min-width: 1441px)" />
	{/if}
	{#if desktop}
		<source srcset={desktop} media="(min-width: 1025px)" />
	{/if}
	{#if tablet}
		<source srcset={tablet} media="(min-width: 621px)" />
	{/if}
	<img class={className} srcset={src} {width} {height} {alt} {loading} />
	{#if caption}
		<caption class="{baseName}__caption">
			<span class="$text-left">{caption}</span>
		</caption>
	{/if}
</picture>
