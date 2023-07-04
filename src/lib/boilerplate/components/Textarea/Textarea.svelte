<script lang="ts">
	import './Textarea.scss'
	import classnames from 'classnames'
	import { uniqueId } from 'lodash-es'

	// --- Data --------------------------------------------------------------------------------------

	export let label: string | boolean = false
	export let name = 'textarea'
	export let placeholder: string | null = null
	export let required = false
	export let rows: string | number = 4
	export let value = ''

	const id = uniqueId(`textarea-${name}-`)

	// --- CSS Class ---------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'Textarea'
	const className = classnames(baseName, $$props.class)
</script>

<div class={className}>
	{#if label}
		<label class={baseName + '__label'} for={name}>
			{label}
			{#if required}*{/if}
		</label>
	{/if}
	<textarea class={baseName + '__input'} {required} {id} {name} {rows} {placeholder} bind:value />
</div>
