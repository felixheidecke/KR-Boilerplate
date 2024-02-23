<script lang="ts">
	import classNames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '../Button/Button.svelte'
	import Form from '../Form/Form.svelte'
	import Modal from '../Modal/Modal.svelte'
	import type { XioniCMS } from '$lib/boilerplate/xioni/cms/XioniCMS.types'
	import * as date from '$lib/utils/formatDate'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let formId: number | string
	export let event: XioniCMS.Event | undefined = undefined

	// -----------------------------------------------------------------------------------------------

	let modal: Modal

	export const open = () => modal.open()
	export const close = () => modal.close()

	// CSS Classnames
	const baseName = 'XioniEventRegistration'
</script>

<Modal
	title="Anmeldung"
	bind:this={modal}
	class={classNames(baseName, $$props.class)}
	on:open
	on:close>
	{#if event}
		<header class="{baseName}__header">
			<h3 class="{baseName}__title">{event.title}</h3>
			<time>{@html date.formatFromTo(event.starts, event.ends)}</time>
		</header>

		<Form id={formId} subject="Event Anmeldung ({event.$id})" class="$mt-2" attach="csv">
			<input type="hidden" name="Event" value="{event.title} ({event.$id})" />
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
