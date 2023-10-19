<script lang="ts">
	import './Mail.css'

	import classnames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: string
	export let icon: string | undefined = 'fas fa-envelope'

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const obfuscatedEmail = to.replaceAll('@', '&#64;').replaceAll('.de', '&#8228;&#100;&#101;')
	const baseName = $$props['ex-class'] || 'Mail'
	const className = classnames(baseName, $$props.class)
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
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
