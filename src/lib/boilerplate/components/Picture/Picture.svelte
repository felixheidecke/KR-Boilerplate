<script lang="ts">
	import './picture.css'

	import { PicturePropsLoading, type PictureProps } from './Picture.types'
	import classnames from 'classnames'

	// --- Props -------------------------

	// export let src: PictureProps['src']
	// export let tablet: PictureProps['tablet'] = undefined
	// export let desktop: PictureProps['desktop'] = undefined
	// export let widescreen: PictureProps['widescreen'] = undefined
	// export let alt: PictureProps['alt'] = ''

	$: ({ src, tablet, desktop, widescreen, alt, loading, align, id } = {
		loading: PicturePropsLoading.LAZY,
		alt: '',
		...$$props
	} as PictureProps)

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'Picture'

	$: className = classnames(
		baseName,
		$$props.class as string,
		!align || [baseName, '--', align].join('')
	)
</script>

<picture {id}>
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
