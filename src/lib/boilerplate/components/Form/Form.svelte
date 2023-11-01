<script lang="ts">
	import { FetchMethods, FetchResponseStatus } from '$lib/boilerplate/utils/fetch-json/types'
	import { onMount, createEventDispatcher } from 'svelte'
	import { XIONI_API_URL } from '$lib/boilerplate/constants'
	import classnames from 'classnames'
	import FetchJson from '$lib/boilerplate/utils/fetch-json'
	import Message from '../Message/Message.svelte'
	import FormMailFactory from '$lib/boilerplate/libraries/xioni/formMail'
	import type { XioniFetchErrorResponse } from '$lib/boilerplate/libraries/xioni-fetch/types'

	const emit = createEventDispatcher()
	const formMail = FormMailFactory()

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

	// --- Methods -----------------------------------------------------------------------------------

	const scrollToDoneText = () => {
		if (!isDoneEl || !$$slots.done) return

		isDoneEl.scrollIntoView({
			behavior: `smooth`,
			block: 'center',
			inline: 'nearest'
		})
	}

	const getFormData = () => {
		const formData = new FormData(form)
		return Object.fromEntries(formData)
	}

	function submitt() {}

	export const submit = async () => {
		if (isDone) return

		// Reset status
		isLoading = true
		errors = []

		try {
			const { data, status } = await fetchJson([XIONI_API_URL, 'form'], {
				method: FetchMethods.POST,
				data: getFormData(),
				params: attach === 'csv' ? { attach: 'csv' } : undefined
			})

			if (status !== FetchResponseStatus.SUCCESS) throw data

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
		} finally {
			isLoading = false
		}
	}

	function creatingHandler() {
		isLoading = true
	}

	function createdHandler() {
		setTimeout(scrollToDoneText, 100)
	}

	function errorHandler(error: XioniFetchErrorResponse) {
		error.data.payload
	}

	function finallyHandler() {
		isLoading = false
	}

	// collect required entries
	onMount(() => {
		formMail.$event.on('creating', creatingHandler)
		formMail.$event.on('finally', finallyHandler)
		formMail.$event.on('error', errorHandler)
		formMail.$event.on('created', createdHandler)

		form.querySelectorAll('[required]').forEach(element => {
			required = [...required, element.getAttribute('name') || '']
		})
	})

	const baseName = $$props['ex-class'] || 'Form'
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
