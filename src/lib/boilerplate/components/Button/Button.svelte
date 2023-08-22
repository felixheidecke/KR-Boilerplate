<script lang="ts">
	import './Button.scss'

	import classnames from 'classnames'
	import isExternalURL from '$lib/boilerplate/utils/isExternalURL'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: string | undefined = undefined
	export let icon = ''
	export let rel: 'follow' | 'nofollow' = 'follow'
	export let disabled = false
	export let target: '_blank' | undefined = undefined
	export let isLoading = false

	// -----------------------------------------------------------------------------------------------

	if (to && isExternalURL(to)) {
		rel = 'nofollow'
		target = '_blank'
	}

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
