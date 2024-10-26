<script lang="ts">
	import './Figure.css'
	import classNames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let src: string
	export let alt = ''
	export let width: string | number | undefined = undefined
	export let height: string | number | undefined = undefined
	export let caption = ''
	export let loading: HTMLImageElement['loading'] | undefined = undefined
	export let placeholder = ''
	export let baseName = 'Figure'

	// -----------------------------------------------------------------------------------------------

	const style = placeholder ? `background-image:url(${placeholder})` : undefined
</script>

<figure {...$$restProps} class={classNames(baseName, $$props.class)}>
	<img
		class="{baseName}__image"
		{src}
		{alt}
		{width}
		{height}
		{style}
		loading={placeholder ? 'lazy' : loading} />
	{#if caption}
		<figcaption class="{baseName}__caption">
			{caption}
		</figcaption>
	{/if}
</figure>
