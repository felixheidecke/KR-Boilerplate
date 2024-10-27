<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte'
	import { useFormMail } from '$lib/boilerplate/xioni/formmail/FormMail'
	import classnames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Message from '../Message/Message.svelte'

	// --- Props -------------------------------------------------------------------------------------

	export let subject = 'Kontakformular'
	export let to: number | string
	export let attachBodyAsCSV: boolean = false
	export let baseName = 'Form'

	// -----------------------------------------------------------------------------------------------

	const emit = createEventDispatcher()
	const formMail = useFormMail()

	let formEl: HTMLFormElement
	let formErrors: string[] = []
	let formFieldsRequired: string[] = []
	let isFormDone = false
	let isFormLoading = false
	let isDoneEl: HTMLElement

	function scrollToDoneText() {
		if (!isDoneEl || !$$slots.done) return

		isDoneEl.scrollIntoView({
			behavior: `smooth`,
			block: 'center',
			inline: 'nearest'
		})
	}

	function getFormData() {
		const formData = new FormData(formEl)
		return Object.fromEntries(formData)
	}

	export function submit() {
		if (isFormDone) return

		isFormLoading = true
		formErrors = []

		formMail
			.send(to, subject, formFieldsRequired, getFormData(), { attachBodyAsCSV })
			.then(() => {
				isFormDone = true

				scrollToDoneText()
				emit('success')
			})
			.catch(error => {
				formErrors = error.details.body

				emit('error', error.details)
			})
			.finally(() => {
				isFormLoading = false
			})
	}

	onMount(() => {
		// collect required entries
		formEl.querySelectorAll('[required]').forEach(element => {
			formFieldsRequired = [...formFieldsRequired, element.getAttribute('name') || '']
		})
	})
</script>

<form
	class={classnames(baseName, $$props.class)}
	bind:this={formEl}
	on:submit|preventDefault={submit}>
	{#if isFormDone}
		<div bind:this={isDoneEl} class={baseName + '__done'}>
			<slot name="done" />
		</div>
	{:else}
		<slot />
	{/if}

	{#if formErrors.length}
		<Message class="{baseName}__errors $mt" type="error" title="Fehler aufgetreten">
			<ul>
				{#each formErrors as message}
					<li>{message}</li>
				{/each}
			</ul>
		</Message>
	{/if}
</form>
