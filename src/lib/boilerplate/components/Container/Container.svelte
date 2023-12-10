<script lang="ts">
	import './Container.scss'
	import classname from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------
	export let id: string | undefined = undefined

	// -----------------------------------------------------------------------------------------------
	let tag = 'div'
</script>

<svelte:element this={tag} class={classname('Container', $$props.class)} {id}>
	<slot />
</svelte:element>
