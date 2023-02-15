<script lang="ts">
	import type { XioniEvent } from '$lib/boilerplate/libraries/xioni/event.types'
	import * as date from '$lib/boilerplate/utils/format-date'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '../Button/Button.svelte'
	import Form from '../Form/Form.svelte'
	import Modal from '../Modal/Modal.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let formId: number | string

	// --- [ Logic ] ---------------------------------------------------------------------------------

	let form: Form

	const event = getContext('active-xioni-event') as Writable<XioniEvent | null>
</script>

<Modal title="Anmeldung" isOpen={!!$event} on:close={() => event.set(null)}>
	{#if $event}
		<div class="$text-center">
			<h4 class="$text-center $font-large $mb-1/4">{$event.title}</h4>
			<time class="$font-small">{@html date.formatFromTo($event.starts, $event.ends)}</time>
		</div>

		<Form
			id={formId}
			bind:this={form}
			subject="Event Anmeldung ({$event.id})"
			class="$mt-2"
			attach="csv"
		>
			<input type="hidden" name="Event" value="{$event.title} ({$event.id})" />
			<input type="hidden" name="Datum" value={date.format($event.starts, 'P')} />

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
