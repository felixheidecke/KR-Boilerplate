<script lang="ts">
	import './Input.scss'

	import classnames from 'classnames'
	import { uniqueId } from 'lodash-es'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import { type InputProps, InputPropsType } from './Input.types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let label: InputProps['label'] = ''
	export let max: InputProps['max'] = undefined
	export let min: InputProps['min'] = undefined
	export let name: InputProps['name'] = 'input'
	export let placeholder: InputProps['placeholder'] = ''
	export let readonly: InputProps['readonly'] = undefined
	export let required: InputProps['required'] = undefined
	export let type: InputProps['type'] = InputPropsType.TEXT
	export let value: InputProps['value'] = ''
	export let error: InputProps['error'] = ''
	export let multiple: InputProps['multiple'] = false
	export let baseName = 'Input'

	// -----------------------------------------------------------------------------------------------

	$: className = classnames(
		baseName,
		$$props.class,
		!!error ? baseName + '--has-error' : null,
		!!readonly ? baseName + '--read-only' : null
	)
	const id = uniqueId(name + '-')
	const inputProps = {
		max,
		min,
		name,
		placeholder,
		required,
		readonly,
		type,
		multiple
	}
</script>

<div {id} class={className}>
	{#if label}
		<label class={baseName + '__label'} for={id}>
			{label}

			{#if required}*{/if}
		</label>
	{/if}
	<input class={baseName + '__input'} {...inputProps} bind:value />
</div>
