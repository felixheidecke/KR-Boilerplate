<script lang="ts">
	import './LoadingIndicator.scss'

	import classnames from 'classnames'
	import { createEventDispatcher, onMount } from 'svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let show: boolean = true
	export let baseName = 'LoadingIndicator'

	// -----------------------------------------------------------------------------------------------

	const emit = createEventDispatcher()
	let dialog: HTMLDialogElement

	export function close() {
		dialog.close()
		emit('close')
	}

	export function open() {
		dialog.showModal()
		emit('open')
	}

	onMount(() => {
		if (show) open()
	})
</script>

<dialog bind:this={dialog} class={classnames(baseName, $$props.class)}>
	<div class={baseName + '__animation'}>
		<div class={baseName + '__animation--dot'}></div>
		<div class={baseName + '__animation--dot'}></div>
		<div class={baseName + '__animation--dot'}></div>
		<div class={baseName + '__animation--dot'}></div>
		<div class={baseName + '__animation--dot'}></div>
		<div class={baseName + '__animation--dot'}></div>
		<div class={baseName + '__animation--dot'}></div>
		<div class={baseName + '__animation--dot'}></div>
	</div>
</dialog>
