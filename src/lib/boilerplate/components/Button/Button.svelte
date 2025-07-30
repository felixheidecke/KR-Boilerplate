<script lang="ts">
	import './Button.scss'

	import classnames from 'classnames'
	import isExternalURL from '$lib/boilerplate/utils/isExternalURL'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Fontello from '../Fontello/Fontello.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let baseName = 'Button'
	export let disabled = false
	export let fontello: string = ''
	export let isLoading = false
	export let rel: 'follow' | 'nofollow noopener' = 'nofollow noopener'
	export let target: '_blank' | undefined = undefined
	export let to: string | undefined = undefined

	// -----------------------------------------------------------------------------------------------

	if (to && isExternalURL(to)) {
		rel = 'nofollow noopener'
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
		{#if fontello}
			<Fontello baseName={baseName + '__icon'} name={fontello} />&nbsp;
		{/if}
		<span class="{baseName}__text">
			<slot />
		</span>
	</button>
{:else}
	<a on:click href={to} {target} {...$$restProps} class={classnames(className, $$props.class)}>
		{#if fontello}
			<Fontello baseName={baseName + '__icon'} name={fontello} />&nbsp;
		{/if}
		<span class="{baseName}__text">
			<slot />
		</span>
	</a>
{/if}
