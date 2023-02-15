<script lang="ts">
	import './opening-hours.scss'
	import classnames from 'classnames'
	import OpeningHours from '@/js/opening-hours'
	import { isTrue } from '@/js/utils/helper'

	// --- Components --------------------------------------------------------------------------------

	import Modal from '../Modal.svelte'

	// --- Data --------------------------------------------------------------------------------------

	export let hours
	export let signOpen = false
	export let signClosed = false

	const interactive = isTrue($$props.interactive)

	let modal: HTMLElement

	const { openNow, nextChange, distanceToNextChange, table } = new OpeningHours(hours)

	// --- Computed ---------------------

	$: signText = openNow
		? `Wir schließen ${distanceToNextChange}`
		: `Wir öffnen ${distanceToNextChange}`

	// --- CSS Class

	const baseName = $$props['ex-class'] || 'OpeningHours'

	$: className = classnames(
		baseName,
		$$props.class,
		openNow ? baseName + '--open' : baseName + '--closed'
	)
</script>

<div class={className}>
	{#if openNow && signOpen}
		<img class={`${baseName}__sign`} src={signOpen} alt="Wir haben geöffnet" />
	{:else if signClosed}
		<img class={`${baseName}__sign`} src={signClosed} alt="Wir haben geschlossen" />
	{/if}

	<span class={`${baseName}__distance`}>{signText}</span>
	<span class={`${baseName}__next-change`}>{nextChange}</span>
	{#if interactive}
		<span class={`${baseName}__trigger`} on:click={modal.open}>Öffnungszeiten</span>
	{/if}
</div>

{#if interactive}
	<Modal bind:this={modal} class={baseName + '__modal'} title="Unsere Öffnungszeiten">
		<div class={baseName + '__modal-body'}>
			{#each table as day}
				{day}
				<br />
			{/each}
		</div>
	</Modal>
{/if}
