<script lang="ts">
	import './select.scss'
	import classnames from 'classnames'
	import { uniqueId } from 'lodash-es'

	// --- Data -------------------------

	export let label = false
	export let name = 'select'
	export let options: string[] = []
	export let required = false
	export let values: Array<string | number> = options
	export let value = values[0]

	const id = uniqueId(name + '-')

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'FormSelect'

	$: className = classnames(baseName, $$props.class)
</script>

<div class={className}>
	{#if label}
		<label class={baseName + '__label'} for={name}>{label}</label>
	{/if}
	<select {id} {name} {required} class={baseName + '__input'} bind:value>
		{#each options as option, i}
			<option value={values[i]}>{option}</option>
		{/each}
	</select>
</div>
