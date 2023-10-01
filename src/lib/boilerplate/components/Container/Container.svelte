<script lang="ts">
	import './Container.scss'
	import classname from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let baseName = 'Checkbox'
	export let tag = 'div'
</script>

<svelte:element this={tag} {...$$restProps} class={classname(baseName, $$props.class)}>
	<slot />
</svelte:element>
