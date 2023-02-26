<script>
	import './Input.scss'
	import classnames from 'classnames'
	import { uniqueId } from 'lodash-es'

	export let label = null
	export let max = null
	export let min = null
	export let name = 'input'
	export let placeholder = null
	export let readonly = null
	export let required = false
	export let type = 'text'
	export let value = ''

	const id = uniqueId(name + '-')
	$: inputProps = {
		id,
		max,
		min,
		name,
		placeholder,
		required,
		type,
		readonly
	}

	$: if (label && required) label += '*'

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'Input'

	$: className = classnames(baseName, $$props.class)
</script>

<div class={className}>
	{#if label}
		<label class={baseName + '__label'} for={id}>{label}</label>
	{/if}
	<input class={baseName + '__input'} {...inputProps} bind:value />
</div>

<style global lang="scss">
</style>
