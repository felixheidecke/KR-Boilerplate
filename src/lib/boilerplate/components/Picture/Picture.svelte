<script lang="ts">
	import './Picture.css'
	import classnames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let src: string
	export let tablet = ''
	export let desktop = ''
	export let widescreen = ''
	export let width: number | string | undefined = undefined
	export let height: number | string | undefined = undefined
	export let align: 'left' | 'right' | undefined = undefined
	export let alt = ''
	export let loading: HTMLImageElement['loading'] | undefined = undefined
	export let placeholder = ''

	// -----------------------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'Picture'
	const style = placeholder ? `background-image:url(${placeholder})` : undefined

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
	<img
		class={className}
		srcset={src}
		{width}
		{height}
		{alt}
		loading={placeholder ? 'lazy' : loading}
		{style} />
</picture>
