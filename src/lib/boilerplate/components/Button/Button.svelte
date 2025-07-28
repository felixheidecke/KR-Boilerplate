<script lang="ts">
	import './Button.scss'

	import classnames from 'classnames'
	import isExternalURL from '$lib/boilerplate/utils/isExternalURL'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Fontello from '../Fontello/Fontello.svelte'
	import type { ButtonProps } from './Button'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let {
		baseName = 'Button',
		class: classNamePorp,
		children,

		disabled = false,
		fontello,
		isLoading = false,
		rel = 'nofollow noopener',
		target,
		to,
		...restProps
	}: ButtonProps = $props()

	// -----------------------------------------------------------------------------------------------

	if (to && isExternalURL(to)) {
		rel = 'nofollow noopener'
		target = '_blank'
	}

	const classNames = classnames(
		classNamePorp,
		baseName,
		disabled ? baseName + '--disabled' : null,
		!to || baseName + '--anchor',
		!isLoading || baseName + '--loading'
	)
</script>

{#if !to}
	<button {disabled} {...restProps} class={classNames}>
		{#if fontello}
			<Fontello baseName={baseName + '__icon'} name={fontello} />
		{/if}
		<span class="{baseName}__text">
			{@render children?.()}
		</span>
	</button>
	<a href={to} {target} {...restProps} class={classNames}>
		{#if fontello}
			<Fontello baseName={baseName + '__icon'} name={fontello} />
		{/if}
		<span class="{baseName}__text">
			{@render children?.()}
		</span>
	</a>
{/if}
