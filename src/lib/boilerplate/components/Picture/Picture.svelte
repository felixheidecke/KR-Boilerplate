<script lang="ts">
	import './picture.css'
	import classnames from 'classnames'

	// --- Data -------------------------

	export let src: string
	export let alt = ''
	export let loading: 'lazy' | 'eager' = 'lazy'
	export let align: 'left' | 'right' | undefined = undefined

	export let tablet: string | undefined = undefined
	export let desktop: string | undefined = undefined
	export let widescreen: string | undefined = undefined

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
