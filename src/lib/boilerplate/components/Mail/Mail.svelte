<script lang="ts">
	import './Mail.css'

	import classnames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: string
	export let icon: string | null | false = 'fas fa-envelope'
	export let subject: string | undefined = undefined
	export let body: string | undefined = undefined

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const obfuscatedEmail = to.replaceAll('@', '&#64;').replaceAll('.de', '&#8228;&#100;&#101;')
	const baseName = $$props['ex-class'] || 'Mail'
	const className = classnames(baseName, $$props.class)
	const showIcon = typeof icon === 'string' && icon !== 'false'

	function makeHref() {
		const link = new URL('mailto:' + to)

		if (subject) {
			link.searchParams.set('subject', subject)
		}

		if (body) {
			link.searchParams.set('body', body)
		}

		return link.toString()
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
	on:click|preventDefault={() => (location.href = makeHref())}
	{...$$restProps}
	class={className}>
	{#if showIcon && icon}
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
