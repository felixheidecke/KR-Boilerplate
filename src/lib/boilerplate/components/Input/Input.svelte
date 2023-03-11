<script lang="ts">
	import './Input.scss'

	import classnames from 'classnames'
	import { uniqueId } from 'lodash-es'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import { type InputProps, ImputPropsType } from './Input.types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let label: InputProps['label'] = ''
	export let max: InputProps['max'] = undefined
	export let min: InputProps['min'] = undefined
	export let name: InputProps['name'] = 'input'
	export let placeholder: InputProps['placeholder'] = 'input'
	export let readonly: InputProps['readonly'] = false
	export let required: InputProps['required'] = false
	export let type: InputProps['type'] = ImputPropsType.TEXT
	export let value: InputProps['value'] = ''

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'Input'
	const className = classnames(baseName, $$props.class)
	const id = uniqueId(name + '-')
	const inputProps = {
		max,
		min,
		name,
		placeholder,
		required,
		readonly,
		type
	}

	$: if (label && required) {
		label += '*'
	}
</script>

<div {id} class={className}>
	{#if label}
		<label class={baseName + '__label'} for={id}>{label}</label>
	{/if}
	<input class={baseName + '__input'} {...inputProps} bind:value />
</div>
