<script lang="ts">
	import './Mail.css'

	import classnames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { MailProps } from './Mail.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: MailProps['to']
	export let icon: MailProps['icon'] = 'fas fa-envelope'

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const obfuscatedEmail = to.replaceAll('@', '&#64;').replaceAll('.de', '&#8228;&#100;&#101;')
	const baseName = $$props['ex-class'] || 'Mail'
	const className = classnames(baseName, $$props.class)
</script>

<span on:click|preventDefault={() => (location.href = 'mailto:' + to)} class={className}>
	{#if icon}
		<Icon ex-class={baseName + '__icon'} name={icon} />
	{/if}
	<span class={baseName + '__address'}>
		{#if $$slots.default}
			<slot />
		{:else}
			{@html obfuscatedEmail}
		{/if}
	</span>
</span>
