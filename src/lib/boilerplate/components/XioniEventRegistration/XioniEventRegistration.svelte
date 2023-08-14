<script lang="ts">
	import type { XioniEvent } from '$lib/boilerplate/libraries/xioni/events.types'
	import * as date from '$lib/boilerplate/utils/format-date'
	import classNames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '../Button/Button.svelte'
	import Form from '../Form/Form.svelte'
	import Modal from '../Modal/Modal.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let formId: number | string
	export let event: XioniEvent | undefined = undefined

	// -----------------------------------------------------------------------------------------------

	let modal: Modal

	export const open = () => modal.open()
	export const close = () => modal.close()

	// CSS Classnames
	const baseName = $$props['ex-class'] || 'XioniEventRegistration'
	const className = classNames(baseName, $$props.class)
</script>

<Modal title="Anmeldung" bind:this={modal} class={baseName} on:open on:close>
	{#if event}
		<header class="{className}__header">
			<h4 class="{className}__title">{event.title}</h4>
			<time class="$font-small">{@html date.formatFromTo(event.starts, event.ends)}</time>
		</header>

		<Form id={formId} subject="Event Anmeldung ({event.id})" class="$mt-2" attach="csv">
			<input type="hidden" name="Event" value="{event.title} ({event.id})" />
			<input type="hidden" name="Datum" value={date.format(event.starts, 'P')} />

			<slot />

			<div slot="done">
				<slot name="done" />
			</div>

			<div class="$text-right">
				<Button>Abschicken</Button>
			</div>
		</Form>
	{/if}
</Modal>
