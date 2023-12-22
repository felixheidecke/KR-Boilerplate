<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte'
	import { xioniFetch } from '$lib/boilerplate/xioni/utils/xioniFetch'
	import classnames from 'classnames'
	import Message from '../Message/Message.svelte'

	const emit = createEventDispatcher()
	const http = xioniFetch()

	// --- Props -------------------------------------------------------------------------------------

	export let subject = 'Kontakformular'
	export let id: number | string = 0
	export let attach: string | false = false

	// --- Data --------------------------------------------------------------------------------------

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

	export const submit = async () => {
		if (isDone) return

		// Reset status
		isLoading = true
		errors = []

		try {
			const { data, status } = await http(['form'], {
				method: 'POST',
				data: getFormData(),
				params: attach === 'csv' ? { attach: 'csv' } : undefined
			})

			if (status !== 'success') throw data

			if (data && 'error' in data && 'message' in data) {
				errors = (data.message as string).split(',')
				isDone = false
				emit('error', data.error)
				return
			}

			isDone = true
			emit('success')
			setTimeout(scrollToDoneText, 100)
		} catch (error) {
			isDone = false
			errors = [error as string]
			emit('error', error)
		} finally {
			isLoading = false
		}
	}

	// collect required entries
	onMount(() => {
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
	<input type="hidden" name="required" value={required.join(',')} />
	<input type="text" name="honig" style="position:absolute;left:-9999px;" />

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
