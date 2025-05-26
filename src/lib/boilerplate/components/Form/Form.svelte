<script lang="ts">
	import { useMailer } from '$lib/boilerplate/xioni/mailer/Message'
	import { writable } from 'svelte/store'
	import classnames from 'classnames'

	import type { XioniApiErrorResponse } from '$lib/boilerplate/xioni/types'
	import type { SchemaMailerMessageRequestBody } from '$lib/boilerplate/xioni/api/api.d'
	import type { FormProps } from './Form'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Message from '../Message/Message.svelte'
	import Modal from '../Modal/Modal.svelte'
	import LoadingIndicator from '../LoadingIndicator/LoadingIndicator.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let {
		baseName = 'Form',
		moduleId,
		successHandler = () => console.log('success'),
		errorHandler = error => console.error(error),
		class: className,
		children,
		done
	}: FormProps = $props()

	// -----------------------------------------------------------------------------------------------

	let formEl: HTMLFormElement
	let doneModalEl: Modal
	let errorModalEl: Modal

	const formMail = useMailer()
	const formError = writable<XioniApiErrorResponse | undefined>()
	const isFormDone = writable(false)
	const isLoading = writable(false)

	export function submit(e: Event) {
		e.preventDefault()

		const formData = new FormData(formEl)
		formData.set('module-id', moduleId.toString())

		isLoading.set(true)
		formError.set(undefined)

		formMail
			.send(formData as unknown as SchemaMailerMessageRequestBody)
			.then(() => {
				formEl.reset()
				isFormDone.set(true)
				doneModalEl.open()
				successHandler()
			})
			.catch(error => {
				formError.set(error)
				errorModalEl.open()
				errorHandler(error)
			})
			.finally(() => isLoading.set(false))
	}
</script>

<form class={classnames(baseName, className)} bind:this={formEl} onsubmit={submit}>
	{@render children?.()}
</form>

{#if $isLoading}
	<LoadingIndicator />
{/if}

<Modal bind:this={doneModalEl}>
	{#if done}
		{@render done?.()}
	{:else}
		<p>Vielen Dank.</p>
	{/if}
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
