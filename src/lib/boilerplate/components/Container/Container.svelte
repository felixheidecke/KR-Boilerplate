<script lang="ts">
	import './Container.scss'
	import cn from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------
	export let id: string | undefined = undefined

	// -----------------------------------------------------------------------------------------------
	let tag = 'div'
</script>

<svelte:element this={tag} class={cn('Container', $$props.class)} {id}>
	<slot />
</svelte:element>
