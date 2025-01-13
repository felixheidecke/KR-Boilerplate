<script lang="ts">
	import { createEventDispatcher, SvelteComponent } from 'svelte'
	import { useFormMail6 } from '$lib/boilerplate/xioni/formmail/FormMail'
	import { writable } from 'svelte/store'
	import classnames from 'classnames'

	import type { XioniApiErrorResponse } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Message from '../Message/Message.svelte'
	import Modal from '../Modal/Modal.svelte'
	import LoadingIndicator from '../LoadingIndicator/LoadingIndicator.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let baseName = 'Form'
	export let moduleId: number | string

	// -----------------------------------------------------------------------------------------------

	let formEl: HTMLFormElement
	let doneModalEl: SvelteComponent
	let errorModalEl: SvelteComponent

	const emit = createEventDispatcher()
	const formMail = useFormMail6()
	const formError = writable<XioniApiErrorResponse | undefined>()
	const isFormDone = writable(false)
	const isLoading = writable(false)

	export function submit() {
		const formData = new FormData(formEl)

		formData.set('module-id', moduleId.toString())

		isLoading.set(true)
		formError.set(undefined)

		formMail
			.send(formData)
			.then(() => {
				formEl.reset()
				isFormDone.set(true)
				doneModalEl.open()
				emit('success')
			})
			.catch(error => {
				formError.set(error)
				errorModalEl.open()
				emit('error', error)
			})
			.finally(() => isLoading.set(false))
	}
</script>

<form
	class={classnames(baseName, $$props.class)}
	bind:this={formEl}
	on:submit|preventDefault={submit}>
	<slot />
</form>

{#if $isLoading}
	<LoadingIndicator />
{/if}

<Modal bind:this={doneModalEl}>
	<slot name="done" />
</Modal>

<Modal bind:this={errorModalEl}>
	<Message class="{baseName}__errors" type="error">
		<ul>
			{#each Object.entries($formError?.details || []) as [key, values]}
				<li>
					<b>{key.toUpperCase()}:</b>
					{values.map(value => value.message).join('<br />')}
				</li>
			{/each}
		</ul>
	</Message>
</Modal>
