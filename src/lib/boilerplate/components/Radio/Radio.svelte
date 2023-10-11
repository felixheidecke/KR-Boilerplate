<script lang="ts">
	import './Radio.css'
	import classnames from 'classnames'
	import { uniqueId } from 'lodash-es'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let checked: boolean = false
	export let value: string
	export let group: string = checked ? value : ''
	export let label: string = ''
	export let name: string = 'radio'
	export let required: boolean = false
	export let id = uniqueId(`radio-${name}-`)
	export let baseName = 'Radio'

	// -----------------------------------------------------------------------------------------------

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
