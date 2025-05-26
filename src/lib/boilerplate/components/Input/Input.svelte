<script lang="ts">
	import './Input.scss'

	import classnames from 'classnames'
	import randomString from '$lib/boilerplate/utils/randomString'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import { type InputProps, InputPropsType } from './Input.d'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let label: InputProps['label'] = ''
	export let name: InputProps['name'] = 'input'
	export let placeholder: InputProps['placeholder'] = ''
	export let readonly: InputProps['readonly'] = undefined
	export let required: InputProps['required'] = undefined
	export let type: InputProps['type'] = InputPropsType.TEXT
	export let value: InputProps['value'] = ''
	export let error: InputProps['error'] = ''
	export let multiple: InputProps['multiple'] = false
	export let id = 'input-' + randomString()
	export let baseName = 'Input'

	// -----------------------------------------------------------------------------------------------

	$: className = classnames(
		baseName,
		$$props.class,
		!!error ? baseName + '--has-error' : null,
		!!readonly ? baseName + '--read-only' : null
	)
	const inputProps = {
		name,
		placeholder,
		required,
		readonly,
		type,
		multiple
	}
</script>

<div class={className}>
	{#if label}
		<label class={baseName + '__label'} for={id}>
			{label}

			{#if required}*{/if}
		</label>
	{/if}
	<input {id} {...inputProps} {...$$restProps} class={baseName + '__input'} bind:value />
</div>
