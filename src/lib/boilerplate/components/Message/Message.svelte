<script lang="ts">
	import './Message.scss'

	import classnames from 'classnames'
	import { createEventDispatcher } from 'svelte'
	import Fontello from '../Fontello/Fontello.svelte'

	// --- [ Components ] ----------------------------------------------------------------------------

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let type: 'error' | 'info' | 'success' | undefined = undefined
	export let title: string | number | undefined = undefined
	export let inline = false
	export let tag = 'div'
	export let closable = false

	// -----------------------------------------------------------------------------------------------

	const emit = createEventDispatcher()
	const baseName = $$props['ex-class'] || 'Message'

	$: className = classnames(
		baseName,
		$$props.class,
		!type || baseName + '--' + type,
		!inline || baseName + '--inline',
		!closable || baseName + '--closable'
	)
</script>

<svelte:element this={tag} class={className}>
	{#if closable}
		<Fontello name="cancel" class="{baseName}__close-button" on:click={() => emit('close')} />
	{/if}
	{#if title}
		<h4 class={baseName + '__title'}>
			{title}
		</h4>
	{/if}
	{#if $$slots.default}
		<slot />
	{/if}
	{#if $$slots.code}
		<pre><slot name="code" /></pre>
	{/if}
</svelte:element>
