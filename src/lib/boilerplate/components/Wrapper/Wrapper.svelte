<script lang="ts">
	import './Wrapper.scss'

	import classNames from 'classnames'

	export let tag: string = 'div'
	export let id: string | undefined = undefined
	export let size: 'smaller' | 'small' | 'large' | undefined = undefined

	const className = classNames('Wrapper', size ? `Wrapper--${size}` : undefined, $$props.class)
</script>

<svelte:element this={tag} {id} class={className}>
	<slot />
</svelte:element>
