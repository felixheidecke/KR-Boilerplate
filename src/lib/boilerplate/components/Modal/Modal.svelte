<script lang="ts">
	import './modal.scss'

	import classnames from 'classnames'
	import { createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let title: string | null = null

	// -----------------------------------------------------------------------------------------------

	const emit = createEventDispatcher()
	const baseName = $$props['ex-class'] || 'Modal'
	let modal: HTMLDialogElement

	export function close() {
		modal.close()
		emit('close')
	}

	export function open() {
		modal.showModal()
		emit('open')
	}

	function onKeyDown({ key }: KeyboardEvent) {
		if (key === 'Escape') close()
	}
</script>

<dialog bind:this={modal} class={classnames(baseName, $$props.class)}>
	<button class="{baseName}__close-button" on:click={close}>
		<Icon name="fas fa-times" />
	</button>
	{#if title}
		<header class="{baseName}__header">{title}</header>
	{/if}
	<main class="{baseName}__body">
		<slot />
	</main>
	{#if $$slots.footer}
		<footer class="{baseName}__footer"><slot name="footer" /></footer>
	{/if}
</dialog>

<svelte:window on:keydown={onKeyDown} />
