<script lang="ts">
	import * as date from '$lib/boilerplate/utils/formatDate'
	import classnames from 'classnames'

	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '../Button/Button.svelte'
	import Form from '../Form/Form.svelte'
	import Modal from '../Modal/Modal.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: number | string
	export let event: XioniCMS.Event
	export let baseName = 'XioniEventRegistration'

	// -----------------------------------------------------------------------------------------------

	let modal: Modal

	export const open = () => modal.open()
	export const close = () => modal.close()
</script>

<Modal
	bind:this={modal}
	on:open
	on:close
	title="Anmeldung"
	{...$$restProps}
	class={classnames(baseName, $$props.class)}>
	{#if event}
		<header class="{baseName}__header">
			<h3 class="{baseName}__title">{event.title}</h3>
			<time>{@html date.formatFromTo(event.starts, event.ends)}</time>
		</header>

		<Form {to} subject="Event Anmeldung ({event.id})" attachBodyAsCSV class="$mt-2">
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
