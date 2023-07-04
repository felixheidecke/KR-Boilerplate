<script lang="ts">
	import './select.scss'
	import classnames from 'classnames'
	import { uniqueId } from 'lodash-es'

	// --- Data -------------------------

	export let label = ''
	export let name = 'select'
	export let options: Array<string | number> = []
	export let required = false
	export let values: Array<string | number> = options
	export let value = values[0]
	export let disabled = false

	const id = uniqueId(name + '-')

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'FormSelect'
</script>

<div class={baseName}>
	{#if label}
		<label class={baseName + '__label'} for={name}>{label}</label>
	{/if}
	<select
		{id}
		{name}
		{required}
		{disabled}
		class={classnames(baseName + '__input', $$props.class)}
		bind:value
		on:change>
		{#each options as option, i}
			<option value={values[i]}>{option}</option>
		{/each}
	</select>
</div>
