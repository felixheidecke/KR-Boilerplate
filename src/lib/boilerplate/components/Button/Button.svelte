<script lang="ts">
	import './Button.scss'

	import classnames from 'classnames'
	import isExternalURL from '$lib/boilerplate/utils/isExternalURL'
	import makeBEM from '$lib/boilerplate/utils/makeBem'
	import type { ButtonProps } from './Button'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Fontello from '../Fontello/Fontello.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let {
		baseName = 'Button',
		children,
		class: classProp,
		disabled = false,
		fontello = '',
		isLoading = false,
		rel = 'nofollow noopener',
		target,
		to,
		variant,
		onClick,
		...restProps
	}: ButtonProps = $props()

	// -----------------------------------------------------------------------------------------------

	const { block, element, modifier } = makeBEM(baseName)

	if (to && !target && isExternalURL(to)) {
		rel = 'nofollow noopener'
		target = '_blank'
	}

	const classNames = classnames(
		block,
		classProp,
		variant ? modifier(variant) : null,
		disabled ? modifier('disabled') : null,
		!to || modifier('anchor'),
		!isLoading || modifier('loading')
	)

	function handleClick() {
		if (disabled || !onClick) return

		onClick()
	}
</script>

{#if !to}
	<button onclick={handleClick} {disabled} {...restProps} class={classNames}>
		{#if fontello}
			<Fontello baseName={element('icon')} name={fontello} />&nbsp;
		{/if}
		<span class={element('text')}>
			{@render children?.()}
		</span>
	</button>
{:else}
	<a href={to} onclick={handleClick} {target} {...restProps} class={classNames}>
		{#if fontello}
			<Fontello baseName={element('icon')} name={fontello} />&nbsp;
		{/if}
		<span class={element('text')}>
			{@render children?.()}
		</span>
	</a>
{/if}
