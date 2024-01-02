<script lang="ts">
	import './Mail.css'

	import classnames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: string
	export let icon: string | null = 'fas fa-envelope'
	export let subject: string | undefined = undefined
	export let body: string | undefined = undefined

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const obfuscatedEmail = to.replaceAll('@', '&#64;').replaceAll('.de', '&#8228;&#100;&#101;')
	const baseName = $$props['ex-class'] || 'Mail'
	const className = classnames(baseName, $$props.class)

	function makeHref() {
		const link = 'mailto:' + to
		const params = []

		if (subject) {
			params.push('subject=' + subject)
		}

		if (body) {
			params.push('body=' + subject)
		}

		return params.length ? link + '?' + params.join('&') : link
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:click|preventDefault={() => (location.href = makeHref())} class={className}>
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
