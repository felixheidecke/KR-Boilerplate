<script lang="ts">
	import './button.scss'
	import classnames from 'classnames'

	// --- Components --------------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'
	import type { ButtonProps } from './Button.types'

	// --- Props -------------------------------------------------------------------------------------

	// export let to: string | undefined = undefined
	// export let icon: string | undefined = undefined
	// export let disabled = false
	// export let target: '_blank' | '_self' | undefined = undefined
	// export let isLoading = false

	$: ({ to, icon, disabled, target, isLoading } = {
		disabled: false,
		isLoading: false,
		...$$props
	} as ButtonProps)

	// --- Data --------------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'Button'
	const className = classnames(
		baseName,
		$$props.class,
		!disabled || baseName + '--disabled',
		!to || baseName + '--anchor',
		!isLoading || baseName + '--loading'
	)
</script>

{#if !to}
	<button class={className} {disabled} on:click>
		{#if icon}
			<Icon ex-class={baseName + '__icon'} name={icon} />
		{/if}
		<span class="{baseName}__text">
			<slot />
		</span>
	</button>
{:else}
	<a href={to} {target} class={className} on:click>
		{#if icon}
			<Icon ex-class={baseName + '__icon'} name={icon} />
		{/if}
		<span class="{baseName}__text">
			<slot />
		</span>
	</a>
{/if}
