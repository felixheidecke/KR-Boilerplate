<script lang="ts">
	import './Radio.scss'
	import classnames from 'classnames'
	import { uniqueId } from 'lodash-es'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let checked = false
	export let value: string
	export let group = checked ? value : ''
	export let label = ''
	export let name = 'radio'
	export let required = false

	// -----------------------------------------------------------------------------------------------

	const id = uniqueId(`radio-${name}-`)
	const baseName = $$props['ex-class'] || 'InputRadio'

	$: className = classnames(baseName, $$props.class, !checked || baseName + '--active')
</script>

<label class={className}>
	<input
		{checked}
		{id}
		{name}
		{required}
		{value}
		class={baseName + '__input'}
		type="radio"
		bind:group />
	{#if label}
		<span class={baseName + '__label'}>{@html label}</span>
	{/if}
</label>
