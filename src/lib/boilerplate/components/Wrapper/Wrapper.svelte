<script lang="ts">
	import './Wrapper.scss'

	import classNames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let tag: string = 'div'
	export let responsive: boolean = false
	export let size: 'smaller' | 'small' | 'large' | undefined = undefined
	export let baseName = 'Wrapper'

	// -----------------------------------------------------------------------------------------------

	const className = classNames(
		baseName,
		size ? `${baseName}--${size}` : undefined,
		responsive ? `${baseName}--responsive` : undefined,
		$$props.class
	)
</script>

<svelte:element this={tag} {...$$restProps} class={className}>
	<slot />
</svelte:element>
