<script lang="ts">
	import './Input.scss'

	import classnames from 'classnames'
	import { uniqueId } from 'lodash-es'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let label: string = ''
	export let max: number | string | undefined = undefined
	export let min: number | string | undefined = undefined
	export let name: string = 'input'
	export let placeholder: string = ''
	export let readonly: true | undefined = undefined
	export let required: true | undefined = undefined
	export let type: 'text' | 'number' | 'email' | 'tel' = 'text'
	export let value: string | number = ''
	export let error: string = ''

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'Input'
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
		type
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
