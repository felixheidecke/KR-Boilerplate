<script lang="ts">
	import { onMount, createEventDispatcher, onDestroy } from 'svelte'
	import { XIONI_API_URL } from '$lib/boilerplate/constants'
	import classnames from 'classnames'
	import FetchJson from '$lib/boilerplate/utils/fetch-json'
	import Message from '../Message/Message.svelte'
	import { FormMailFactory } from '$lib/boilerplate/xioni/cms-api'
	import type { XioniFetchErrorResponse } from '$lib/boilerplate/xioni/utils/xioniFetch'

	const emit = createEventDispatcher()
	const formMail = FormMailFactory()
	const fetchJson = FetchJson()

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let subject = 'Kontakformular'
	export let id: number | string = 0
	export let attach: string | false = false

	// --- [ Data ] ----------------------------------------------------------------------------------

	let form: HTMLFormElement
	let required: string[] = []
	let errors: string[] = []
	let isLoading = false
	let isDone = false
	let isDoneEl: HTMLElement

	const baseName = $$props['ex-class'] || 'Form'

	// -----------------------------------------------------------------------------------------------

	function scrollToDoneText() {
		if (!isDoneEl || !$$slots.done) return

		isDoneEl.scrollIntoView({
			behavior: `smooth`,
			block: 'center',
			inline: 'nearest'
		})
	}

	function getFormData() {
		const formData = new FormData(form)
		return Object.fromEntries(formData)
	}

	async function _submit() {
		if (isDone) return

		// Reset status
		errors = []

		try {
			const { data, status } = (await fetchJson([XIONI_API_URL, 'form'], {
				method: 'POST',
				data: getFormData(),
				params: attach === 'csv' ? { attach: 'csv' } : undefined
			})) as any

			if (status !== 'success') throw data

			if (data && 'error' in data && 'message' in data) {
				errors = (data.message as string).split(',')
				isDone = false
				emit('error', data.error)
				return
			}

			isDone = true
			emit('success')
		} catch (error) {
			isDone = false
			errors = [error as string]
			emit('error', error)
		}
	}

	async function submit() {
		formMail.submit({ to: +id, required, subject }, getFormData())
	}

	function setLoadingHandler(state: boolean) {
		isLoading = state
	}

	function successHandler() {
		setTimeout(scrollToDoneText, 100)
	}

	function errorHandler({ data }: XioniFetchErrorResponse) {
		errors = data.payload
	}

	onMount(() => {
		formMail.$event
			.on('loading-toggle', setLoadingHandler)
			.on('error', errorHandler)
			.on('success', successHandler)

		// collect required entries
		form.querySelectorAll('[required]').forEach(element => {
			required = [...required, element.getAttribute('name') || '']
		})
	})

	onDestroy(function () {
		formMail.$event
			.off('loading-toggle', setLoadingHandler)
			.off('error', errorHandler)
			.off('success', successHandler)
	})
</script>

<form
	class={classnames(baseName, $$props.class)}
	bind:this={form}
	on:submit|preventDefault={submit}>
	<input type="hidden" name="subject" value={subject} />
	<input type="hidden" name="id" value={id} />
	<input type="hidden" name="_required" value={required.join(',')} />
	<input type="text" name="_honig" style="position:absolute;left:-9999px;" />

	{#if isDone}
		<div bind:this={isDoneEl} class={baseName + '__done'}>
			<slot name="done" />
		</div>
	{:else}
		<slot />
	{/if}

	{#if errors.length}
		<Message class="{baseName}__errors $mt" type="error" title="Fehler aufgetreten">
			<ul>
				{#each errors as message}
					<li>{message}</li>
				{/each}
			</ul>
		</Message>
	{/if}
</form>
