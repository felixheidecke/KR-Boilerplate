<script lang="ts">
	import './OpeningHours.css'

	import classnames from 'classnames'
	import OpeningHours from '$lib/boilerplate/utils/OpeningHours'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Modal from '../Modal/Modal.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let hours: string
	export let signOpen: string | undefined = undefined
	export let signClosed: string | undefined = undefined
	export let interactive: boolean = false
	export let baseName = 'OpeningHours'

	// -----------------------------------------------------------------------------------------------

	let modal: Modal // Ref

	const { openNow, nextChange, distanceToNextChange, table } = new OpeningHours(hours)

	$: signText = openNow
		? `Wir schließen ${distanceToNextChange}`
		: `Wir öffnen ${distanceToNextChange}`

	$: className = classnames(
		baseName,
		$$props.class,
		openNow ? baseName + '--open' : baseName + '--closed'
	)
</script>

<div class={className}>
	{#if openNow && signOpen}
		<img class={`${baseName}__sign`} src={signOpen} alt="Wir haben geöffnet" />
	{:else if !openNow && signClosed}
		<img class={`${baseName}__sign`} src={signClosed} alt="Wir haben geschlossen" />
	{/if}

	<span class={`${baseName}__distance`}>{signText}</span>
	<span class={`${baseName}__next-change`}>{nextChange}</span>
	{#if interactive}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
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
