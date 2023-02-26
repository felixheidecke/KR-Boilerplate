<script lang="ts">
	import './button.scss'
	import classnames from 'classnames'

	// --- Components --------------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- Props -------------------------------------------------------------------------------------

	export let to: string | undefined = undefined
	export let icon: string | undefined = undefined
	export let disabled = false
	export let target: '_blank' | '_self' | undefined = undefined
	export let isLoading = false

	// --- Data --------------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'Button'
	const className = classnames(
		baseName,
		$$props.class,
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
