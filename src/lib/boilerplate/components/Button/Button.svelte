<script lang="ts">
	import './Button.scss'

	import classnames from 'classnames'
	import isExternalURL from '$lib/boilerplate/utils/isExternalURL'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'
	import Fontello from '../Fontello/Fontello.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let baseName = 'Button'
	export let disabled = false
	export let icon = ''
	export let fontello: string = ''
	export let isLoading = false
	export let rel: 'follow' | 'nofollow' = 'follow'
	export let target: '_blank' | undefined = undefined
	export let to: string | undefined = undefined

	// -----------------------------------------------------------------------------------------------

	if (to && isExternalURL(to)) {
		rel = 'nofollow'
		target = '_blank'
	}

	const className = classnames(
		baseName,
		disabled ? baseName + '--disabled' : null,
		!to || baseName + '--anchor',
		!isLoading || baseName + '--loading'
	)
</script>

{#if !to}
	<button on:click {disabled} {...$$restProps} class={classnames(className, $$props.class)}>
		{#if icon}
			<Icon baseName={baseName + '__icon'} name={icon} />
		{:else if fontello}
			<Fontello baseName={baseName + '__icon'} name={fontello} />
		{/if}
		<span class="{baseName}__text">
			<slot />
		</span>
	</button>
{:else}
	<a on:click href={to} {target} {...$$restProps} class={classnames(className, $$props.class)}>
		{#if icon}
			<Icon baseName={baseName + '__icon'} name={icon} />
		{:else if fontello}
			<Fontello baseName={baseName + '__icon'} name={fontello} />
		{/if}
		<span class="{baseName}__text">
			<slot />
		</span>
	</a>
{/if}
