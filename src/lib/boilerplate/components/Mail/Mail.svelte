<script lang="ts">
	import './Mail.css'

	import classnames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Fontello from '../Fontello/Fontello.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: string
	export let fontello: string = 'mail'
	export let subject: string | undefined = undefined
	export let body: string | undefined = undefined

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const obfuscatedEmail = to.replaceAll('@', '&#64;').replaceAll('.de', '&#8228;&#100;&#101;')
	const baseName = $$props['ex-class'] || 'Mail'
	const className = classnames(baseName, $$props.class)

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
	{#if fontello}
		<Fontello baseName={baseName + '__icon'} name={fontello} />
	{/if}
	<span class={baseName + '__address'}>
		{#if $$slots.default}
			<slot />
		{:else}
			{@html obfuscatedEmail}
		{/if}
	</span>
</span>
