<script lang="ts">
	import { createEventDispatcher } from 'svelte'
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
	let moduleId: number | string = $$props['module-id']

	// -----------------------------------------------------------------------------------------------

	let formEl: HTMLFormElement

	const emit = createEventDispatcher()
	const formMail = useFormMail6()
	const formError = writable<XioniApiErrorResponse['v6'] | undefined>()
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
				emit('success')
			})
			.catch(error => {
				formError.set(error)
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

{#if $isFormDone}
	<Modal isOpen>
		<slot name="done" />
	</Modal>
{/if}

{#if $formError}
	<Modal isOpen>
		<Message class="{baseName}__errors" type="error">
			<ul>
				{#each Object.entries($formError.details || []) as [key, values]}
					<li>
						<b>{key.toUpperCase()}:</b>
						{values.map(value => value.message).join('<br />')}
					</li>
				{/each}
			</ul>
		</Message>
	</Modal>
{/if}
