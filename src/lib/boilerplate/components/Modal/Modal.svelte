<script lang="ts">
	import './modal.scss'
	import classnames from 'classnames'
	import { createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'
	import Icon from '../Icon/Icon.svelte'

	const emit = createEventDispatcher()

	// --- Data -------------------------

	export let title: string | null = null
	export let isOpen = false

	$: if (isOpen) emit('open')
	else emit('close')

	// --- Methods ----------------------

	export const close = () => (isOpen = false)
	export const open = () => (isOpen = true)

	const onKeyDown = ({ key }: KeyboardEvent) => {
		if (key === 'Escape') close()
	}

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'Modal'

	$: className = classnames(baseName, $$props.class)
</script>

{#if isOpen}
	<div class={className} transition:fade={{ duration: 333 }} on:click|self={close}>
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
