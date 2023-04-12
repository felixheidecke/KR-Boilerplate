<script lang="ts">
	import './Button.scss'
	import classnames from 'classnames'

	// --- Components --------------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'
	import type { ButtonProps } from './Button.types'

	// --- Props -------------------------------------------------------------------------------------

	export let to: ButtonProps['to'] = undefined
	export let icon: ButtonProps['icon'] = undefined
	export let disabled: ButtonProps['disabled'] = false
	export let target: ButtonProps['target'] = undefined
	export let isLoading: ButtonProps['isLoading'] = false

	// --- Data --------------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'Button'
	const className = classnames(
		baseName,
		disabled ? baseName + '--disabled' : null,
		!to || baseName + '--anchor',
		!isLoading || baseName + '--loading'
	)
</script>

{#if !to}
	<button class={classnames(className, $$props.class)} {disabled} on:click>
		{#if icon}
			<Icon ex-class={baseName + '__icon'} name={icon} />
		{/if}
		<span class="{baseName}__text">
			<slot />
		</span>
	</button>
{:else}
	<a href={to} {target} class={classnames(className, $$props.class)} on:click>
		{#if icon}
			<Icon ex-class={baseName + '__icon'} name={icon} />
		{/if}
		<span class="{baseName}__text">
			<slot />
		</span>
	</a>
{/if}
