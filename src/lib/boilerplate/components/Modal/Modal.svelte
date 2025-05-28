<script lang="ts">
	import './Modal.scss'

	import classnames from 'classnames'
	import { onMount } from 'svelte'

	import type { ModalProps } from './Modal'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let {
		baseName = 'Modal',
		title,
		isOpen = false,
		class: className,

		children,
		footer,

		closeHandler,
		openHandler
	}: ModalProps = $props()

	// -----------------------------------------------------------------------------------------------

	let modal: HTMLDialogElement

	export function close() {
		modal.close()

		if (closeHandler) closeHandler()
	}

	export function open() {
		modal.showModal()

		if (openHandler) openHandler()
	}

	function onKeyDown({ key }: KeyboardEvent) {
		if (key === 'Escape') close()
	}

	onMount(() => {
		if (isOpen) open()
	})
</script>

<dialog bind:this={modal} class={classnames(baseName, className)}>
	<button class="{baseName}__close-button" onclick={close}>Schließen</button>
	{#if title}
		<header class="{baseName}__header">{title}</header>
	{/if}
	<main class="{baseName}__body">
		{@render children?.()}
	</main>
	{#if footer}
		<footer class="{baseName}__footer">
			{@render footer?.()}
		</footer>
	{/if}
</dialog>

<svelte:window on:keydown={onKeyDown} />
