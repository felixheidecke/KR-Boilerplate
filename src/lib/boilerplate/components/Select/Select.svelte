<script lang="ts">
	import './Select.css'

	import classnames from 'classnames'
	import randomString from '$lib/boilerplate/utils/randomString'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let label: string = ''
	export let name: string = 'select'
	export let options: Array<string | number> = []
	export let required: boolean = false
	export let values: Array<string | number> = options
	export let value: string | number = values[0]
	export let placeholder: string = ''
	export let disabled: boolean = false
	export let id = 'select-' + randomString()
	export let baseName = 'Select'
</script>

<div {...$$restProps} class={classnames(baseName, $$props.class)}>
	{#if label}
		<label class={baseName + '__label'} for={id}>{label}</label>
	{/if}
	<select
		{id}
		{name}
		{required}
		{disabled}
		class={classnames(baseName + '__input', $$props.class)}
		bind:value
		on:change>
		{#if placeholder}
			<option value="" selected>{placeholder}</option>
		{/if}
		{#each options as option, i}
			<option value={values[i]}>{option}</option>
		{/each}
	</select>
</div>
