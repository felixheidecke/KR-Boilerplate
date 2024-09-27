<script lang="ts">
	import './Icon.scss'
	import classnames from 'classnames'

	export let baseName = 'Icon'
	export let name = 'wine'
	export let size = undefined

	// -----------------------------------------------------------------------------------------------

	const className = classnames($$props.class, baseName, `fontello-${name}`)
	const style = size ? `font-size: ${size} !important;` : undefined
</script>

<i class={className} aria-hidden="true" {style} on:click />
