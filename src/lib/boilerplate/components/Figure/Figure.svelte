<script lang="ts">
	import classNames from 'classnames'
	import './Figure.css'

	export let src: string
	export let alt: string = ''
	export let width: string | number | undefined = undefined
	export let height: string | number | undefined = undefined
	export let caption: string = ''
	export let loading: HTMLImageElement['loading'] = 'eager'

	// CSS classes
	const baseClass = $$props['ex-class'] || 'Figure'
	const className = classNames(baseClass, $$props.class)
</script>

<figure class={className}>
	<img class="{baseClass}__image" {src} {alt} {width} {height} {loading} />
	{#if caption}
		<figcaption class="{baseClass}__caption">
			{caption}
		</figcaption>
	{/if}
</figure>
