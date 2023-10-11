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
	export let baseClass = 'Figure'

	// -----------------------------------------------------------------------------------------------

	const style = placeholder ? `background-image:url(${placeholder})` : undefined
</script>

<figure {...$$restProps} class={classNames(baseClass, $$props.class)}>
	<img
		class="{baseClass}__image"
		{src}
		{alt}
		{width}
		{height}
		{style}
		loading={placeholder ? 'lazy' : loading} />
	{#if caption}
		<figcaption class="{baseClass}__caption">
			{caption}
		</figcaption>
	{/if}
</figure>
