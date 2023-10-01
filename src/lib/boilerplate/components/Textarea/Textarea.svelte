<script lang="ts">
	import './Textarea.scss'

	import classnames from 'classnames'
	import { uniqueId } from 'lodash-es'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let label: string | boolean = false
	export let name = 'textarea'
	export let placeholder: string | null = null
	export let required = false
	export let rows: number | null | undefined = 4
	export let value = ''
	export let id = uniqueId(`textarea-${name}-`)
	export let baseName = 'Textarea'
</script>

<div {...$$restProps} class={classnames(baseName, $$props.class)}>
	{#if label}
		<label class={baseName + '__label'} for={name}>
			{label}
			{#if required}*{/if}
		</label>
	{/if}
	<textarea class={baseName + '__input'} {required} {id} {name} {rows} {placeholder} bind:value />
</div>
