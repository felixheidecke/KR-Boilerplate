<script lang="ts">
	import './Checkbox.scss'

	import { uniqueId } from 'lodash-es'
	import classnames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let checked = false
	export let label = ''
	export let name = 'checkbox'
	export let required = false
	export let value = 'on'
	export let baseName = 'Checkbox'

	// -----------------------------------------------------------------------------------------------

	if (label && required) {
		label += '*'
	}

	const id = uniqueId(`input-checkbox-${name}-`)

	$: className = classnames(baseName, $$props.class, !checked || baseName + '--active')
</script>

<label {...$$restProps} class={className}>
	<input
		{id}
		{name}
		{required}
		class={baseName + '__input'}
		type="checkbox"
		{value}
		bind:checked
		on:change />
	<span class={baseName + '__label'}>{@html label}</span>
</label>
