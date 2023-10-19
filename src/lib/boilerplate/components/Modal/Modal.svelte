<script lang="ts">
	import './modal.scss'

	import classnames from 'classnames'
	import { createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let title: string | null = null
	export let isOpen = false

	// -----------------------------------------------------------------------------------------------

	const emit = createEventDispatcher()
	const baseName = $$props['ex-class'] || 'Modal'

	$: if (isOpen) {
		emit('open')
	} else {
		emit('close')
	}

	export function close() {
		isOpen = false
	}

	export function open() {
		isOpen = true
	}

	function onKeyDown({ key }: KeyboardEvent) {
		if (key === 'Escape') close()
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class={classnames(baseName, $$props.class)}
		transition:fade={{ duration: 333 }}
		on:click|self={close}>
		<div class="{baseName}__wrapper">
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
		</div>
	</div>
{/if}

<svelte:window on:keydown={onKeyDown} />
