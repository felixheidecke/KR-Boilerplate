<script lang="ts">
	import './Picture.css'

	import classnames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	type Source = [string, number, number] | [string, number] | string

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let src: Source
	export let tablet: Source = ''
	export let desktop: Source = ''
	export let widescreen: Source = ''
	export let align: 'left' | 'right' | undefined = undefined
	export let placeholder = ''
	export let baseName = 'Picture'

	// -----------------------------------------------------------------------------------------------

	const style = placeholder ? `background-image:url(${placeholder})` : undefined

	function extractProps(src: Source) {
		if (typeof src === 'string') {
			return {
				srcset: src
			}
		}

		return {
			srcset: src[0],
			width: src[1],
			height: src[2] || 'auto'
		}
	}

	$: className = classnames(
		baseName,
		$$props.class as string,
		!align || [baseName, '--', align].join('')
	)
</script>

<picture>
	{#if widescreen}
		<source {...extractProps(widescreen)} media="(min-width: 1441px)" />
	{/if}
	{#if desktop}
		<source {...extractProps(desktop)} media="(min-width: 1025px)" />
	{/if}
	{#if tablet}
		<source {...extractProps(tablet)} media="(min-width: 621px)" />
	{/if}
	<!-- svelte-ignore a11y-missing-attribute -->
	<img {...extractProps(src)} {style} {...$$restProps} class={className} />
</picture>
